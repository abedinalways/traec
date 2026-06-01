import { Provider, ProviderCategory } from "@/app/api/providerApi";

const FALLBACK_PROVIDER_IMAGE = "/images/provider-profile-img.svg";

export const getProviderImageUrl = (
  image?: string | null,
  fallback = FALLBACK_PROVIDER_IMAGE,
) => {
  if (!image) return fallback;

  if (image.startsWith("blob:") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/api/image?path=${encodeURIComponent(image)}`;
};

export const getProviderName = (provider: Provider) => {
  return (
    [provider.name, provider.last_name].filter(Boolean).join(" ") ||
    provider.email ||
    "Unknown Provider"
  );
};

export const getProviderLocation = (provider: Provider) => {
  return (
    [provider.city, provider.state].filter(Boolean).join(", ") ||
    "Location not available"
  );
};

export const getProviderCategoryText = (categories?: ProviderCategory[]) => {
  if (!categories || categories.length === 0) return "No category";

  return categories.map((category) => category.name).join(", ");
};

export const getProviderShortCategoryText = (
  categories?: ProviderCategory[],
) => {
  if (!categories || categories.length === 0) return "No category";

  return categories
    .slice(0, 7)
    .map((category) => category.name)
    .join(", ");
};
