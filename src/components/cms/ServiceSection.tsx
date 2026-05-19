"use client";

import React, { useMemo, useState } from "react";
import {
  SearchIcon,
  ChevronDownIcon,
  Plus,
  Save,
  Trash2,
  X,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";

import ProviderCard from "./ProviderCard";
import EditIcon from "../icons/EditIcon";
import { getImageUrl } from "@/lib/getImageUrl";
import {
  ServiceCategoryItem,
  useDeleteServiceCategoryMutation,
  useGetServiceCategoriesQuery,
  useStoreServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
} from "@/app/api/admin/categoryApi";

type FormState = {
  name: string;
  description: string;
  status: string;
  image: File | null;
};

const defaultFormState: FormState = {
  name: "",
  description: "",
  status: "1",
  image: null,
};

const getCategoryList = (response?: {
  data?: ServiceCategoryItem[] | { data?: ServiceCategoryItem[] };
  categories?: ServiceCategoryItem[];
}): ServiceCategoryItem[] => {
  if (!response) return [];

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (
    response.data &&
    typeof response.data === "object" &&
    "data" in response.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }

  if (Array.isArray(response.categories)) {
    return response.categories;
  }

  return [];
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return fallback;
};

const isActive = (status: ServiceCategoryItem["status"]) => {
  return (
    status === true || status === 1 || status === "1" || status === "active"
  );
};

function ServiceCategorySection() {
  const { data, isLoading, isError, refetch } = useGetServiceCategoriesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [storeCategory, { isLoading: isCreating }] =
    useStoreServiceCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateServiceCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteServiceCategoryMutation();

  const categories = useMemo(() => getCategoryList(data), [data]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<ServiceCategoryItem | null>(null);
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [previewImage, setPreviewImage] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const keyword =
        `${item.name || ""} ${item.description || ""}`.toLowerCase();
      const matchSearch = keyword.includes(search.toLowerCase());

      const active = isActive(item.status);

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && active) ||
        (statusFilter === "inactive" && !active);

      return matchSearch && matchStatus;
    });
  }, [categories, search, statusFilter]);

  const handleInputChange = (
    field: keyof FormState,
    value: string | File | null,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormState(defaultFormState);
    setEditingCategory(null);
    setPreviewImage("");
    setShowForm(false);

    const input = document.getElementById(
      "category-image-input",
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormState(defaultFormState);
    setPreviewImage("");
    setShowForm(true);
    setIsEditingMode(true);
  };

  const handleEditCategory = (category: ServiceCategoryItem) => {
    setEditingCategory(category);
    setFormState({
      name: category.name || "",
      description: category.description || "",
      status: isActive(category.status) ? "1" : "0",
      image: null,
    });
    setPreviewImage("");
    setShowForm(true);
    setIsEditingMode(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      event.target.value = "";
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    handleInputChange("image", file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    if (!formState.description.trim()) {
      toast.error("Category description is required.");
      return;
    }

    if (!editingCategory && !formState.image) {
      toast.error("Category image is required.");
      return;
    }

    const loadingToast = toast.loading(
      editingCategory ? "Updating category..." : "Creating category...",
    );

    try {
      const payload = {
        name: formState.name.trim(),
        description: formState.description.trim(),
        status: formState.status,
        image: formState.image,
      };

      const res = editingCategory?.id
        ? await updateCategory({
            id: editingCategory.id,
            ...payload,
          }).unwrap()
        : await storeCategory(payload).unwrap();

      toast.dismiss(loadingToast);
      toast.success(
        res?.message ||
          (editingCategory
            ? "Category updated successfully."
            : "Category created successfully."),
      );

      resetForm();
      await refetch();
    } catch (error) {
      toast.dismiss(loadingToast);
      console.log("CATEGORY SAVE ERROR:", error);
      toast.error(getErrorMessage(error, "Failed to save category."));
    }
  };

  const handleDeleteCategory = (category: ServiceCategoryItem) => {
    if (!category.id) return;

    const confirmToastId = toast.warning("Delete this category?", {
      description:
        "This action cannot be undone. The selected category will be permanently removed.",
      duration: 8000,
      action: {
        label: "Delete",
        onClick: async () => {
          toast.dismiss(confirmToastId);

          const loadingToast = toast.loading("Deleting category...");

          try {
            const res = await deleteCategory(category.id).unwrap();

            toast.dismiss(loadingToast);
            toast.success(res?.message || "Category deleted successfully.");

            await refetch();
          } catch (error) {
            toast.dismiss(loadingToast);
            console.log("CATEGORY DELETE ERROR:", error);
            toast.error(getErrorMessage(error, "Failed to delete category."));
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss(confirmToastId);
        },
      },
    });
  };

  const isSaving = isCreating || isUpdating;

  return (
    <div className="p-8 min-h-screen font-[inter]">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[14px] font-bold text-[#333] mb-4">
            Manage Service Category
          </h3>
          <h2 className="text-[24px] font-extrabold text-[#1a2b4b] mb-1">
            Expert Service Providers
          </h2>
          <p className="text-[16px] text-gray-500">
            Connect with our top-rated professionals who consistently deliver
            exceptional results
          </p>

          {isLoading ? (
            <p className="mt-2 text-[13px] text-gray-500">
              Loading service categories...
            </p>
          ) : isError ? (
            <p className="mt-2 text-[13px] text-red-500">
              Failed to load service categories.
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[14px] font-medium text-[#1D2433] shadow-sm hover:bg-gray-50"
          >
            <Plus size={16} />
            Add Category
          </button>

          <button
            type="button"
            onClick={() => setIsEditingMode((prev) => !prev)}
            className="text-gray-500 hover:text-black mt-1 cursor-pointer"
          >
            <EditIcon />
          </button>
        </div>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-xl bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[18px] font-semibold text-[#1a2b4b]">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[160px_1fr]">
            <div>
              <div className="h-[110px] w-full overflow-hidden rounded-lg bg-[#edf2f7]">
                <img
                  src={
                    previewImage ||
                    getImageUrl(
                      editingCategory?.image,
                      "/images/experts/experts01.png",
                      editingCategory?.updated_at || editingCategory?.id,
                    )
                  }
                  alt="Category preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <input
                id="category-image-input"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />

              <label
                htmlFor="category-image-input"
                className="mt-3 block cursor-pointer rounded-lg border border-[#dfe1e7] bg-white py-2 text-center text-[13px] font-medium text-[#1D2433] hover:bg-gray-50"
              >
                Upload Image
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] text-gray-500">
                  Category Name
                </label>
                <input
                  value={formState.name}
                  onChange={(event) =>
                    handleInputChange("name", event.target.value)
                  }
                  className="w-full rounded-lg bg-[#edf2f7] p-3 text-[14px] outline-none focus:ring-1 focus:ring-blue-300"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] text-gray-500">
                  Status
                </label>
                <select
                  value={formState.status}
                  onChange={(event) =>
                    handleInputChange("status", event.target.value)
                  }
                  className="w-full rounded-lg bg-[#edf2f7] p-3 text-[14px] outline-none focus:ring-1 focus:ring-blue-300"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-[13px] text-gray-500">
                  Description
                </label>
                <textarea
                  value={formState.description}
                  onChange={(event) =>
                    handleInputChange("description", event.target.value)
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg bg-[#edf2f7] p-3 text-[14px] outline-none focus:ring-1 focus:ring-blue-300"
                  placeholder="Enter category description"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              disabled={isSaving}
              className="rounded-lg border border-[#dfe1e7] bg-white px-5 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-[#030914] px-5 py-2 text-[14px] font-medium text-white hover:bg-black disabled:opacity-60"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : null}

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <span className="text-gray-500 text-[14px]">
          Showing {filteredCategories.length} of {categories.length} services
        </span>

        <div className="flex gap-3">
          <div className="relative">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="bg-[#edf2f7] border border-[#dfe1e7] rounded-lg py-2 pl-4 pr-10 text-[14px] focus:ring-1 focus:ring-blue-300 outline-none w-64"
              placeholder="Search"
            />
            <SearchIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="appearance-none bg-[#edf2f7] border border-[#dfe1e7] rounded-lg py-2 pl-4 pr-10 text-[14px] focus:ring-1 focus:ring-blue-300 outline-none cursor-pointer text-gray-600 min-w-[120px]"
            >
              <option value="all">Category</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <ChevronDownIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {!isLoading && !filteredCategories.length ? (
        <div className="rounded-lg bg-white p-4 text-[14px] text-gray-500 shadow-sm">
          No service category found.
        </div>
      ) : null}

      {/* Provider Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="relative">
            <ProviderCard
              name={category.name || "Untitled Category"}
              role={isActive(category.status) ? "Active" : "Inactive"}
              location={category.description || "No description available"}
              rating="4.9"
              reviews="234"
              image={getImageUrl(
                category.image,
                "/images/experts/experts01.png",
                category.updated_at || category.id,
              )}
            />

            {isEditingMode ? (
              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditCategory(category)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-gray-700 shadow hover:bg-gray-100"
                >
                  <Pencil size={15} />
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDeleteCategory(category)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-red-500 shadow hover:bg-red-50 disabled:opacity-60"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCategorySection;
