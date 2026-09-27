import { baseApi } from "../baseApi";
import type { AuthUser, MeResponse } from "@/types/auth";
import { clearAuthUser, setAuthUser } from "../auth/authSlice";

export type ProfileUpdatePayload = {
  name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  bio?: string;
  languages?: string[];
  category_id?: number[];
  password?: string;
  password_confirmation?: string;
  image?: File | null;
};

export type ProfileUpdateResponse = {
  message?: string;
  user?: AuthUser;
  success?: boolean;
  data?: {
    user?: AuthUser;
  };
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type ChangePasswordResponse = {
  success?: boolean;
  message?: string;
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const getUpdatedUserFromResponse = (
  response?: ProfileUpdateResponse,
): AuthUser | undefined => {
  if (response?.user) return response.user;
  if (response?.data?.user) return response.data.user;
  return undefined;
};

const buildProfileFormData = (payload: ProfileUpdatePayload) => {
  const formData = new FormData();

  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.last_name !== undefined)
    formData.append("last_name", payload.last_name);
  if (payload.phone !== undefined) formData.append("phone", payload.phone);
  if (payload.address !== undefined)
    formData.append("address", payload.address);
  if (payload.city !== undefined) formData.append("city", payload.city);
  if (payload.state !== undefined) formData.append("state", payload.state);
  if (payload.zip_code !== undefined)
    formData.append("zip_code", payload.zip_code);
  if (payload.bio !== undefined) formData.append("bio", payload.bio);

  if (payload.languages?.length) {
    payload.languages.forEach((lang) => formData.append("languages[]", lang));
  } else {
    formData.append("languages", JSON.stringify([]));
  }

  if (payload.category_id?.length) {
    payload.category_id.forEach((id) =>
      formData.append("category_id[]", String(id)),
    );
  } else {
    formData.append("category_id", JSON.stringify([]));
  }

  if (payload.password) formData.append("password", payload.password);
  if (payload.password_confirmation)
    formData.append("password_confirmation", payload.password_confirmation);
  if (payload.image) formData.append("image", payload.image);

  return formData;
};

/* ─── API ─────────────────────────────────────────────────────────────────── */

const profileUpdateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── GET /me ───────────────────────────────────────────────────
    getProfile: builder.query<MeResponse, void>({
      query: () => "/me",
      transformResponse: (response: Record<string, unknown>): MeResponse => {
        const rData = response.data as Record<string, unknown> | undefined;
        const user =
          (response.user as AuthUser) ||
          (rData?.user as AuthUser) ||
          (rData as unknown as AuthUser) ||
          (response as unknown as AuthUser);
        return { authenticated: true, user };
      },

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.authenticated && data.user) {
            dispatch(setAuthUser(data.user));
          } else {
            dispatch(clearAuthUser());
          }
        } catch {
          dispatch(clearAuthUser());
        }
      },

      providesTags: ["User"],
    }),

    // ── PUT /profile/update ────────────────────────────────────────────
    updateProfile: builder.mutation<
      ProfileUpdateResponse,
      ProfileUpdatePayload
    >({
      query: (payload) => {
        const hasImage = payload.image instanceof File;
        const body = hasImage
          ? buildProfileFormData(payload)
          : {
              name: payload.name,
              last_name: payload.last_name,
              phone: payload.phone,
              address: payload.address,
              city: payload.city,
              state: payload.state,
              zip_code: payload.zip_code,
              bio: payload.bio,
              languages: payload.languages || [],
              category_id: payload.category_id || [],
              ...(payload.password
                ? {
                    password: payload.password,
                    password_confirmation: payload.password_confirmation,
                  }
                : {}),
            };

        return {
          url: "/profile/update",
          method: "PUT",
          body,
        };
      },

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const updatedUser = getUpdatedUserFromResponse(data);

          if (updatedUser) {
            dispatch(setAuthUser(updatedUser));
            dispatch(
              profileUpdateApi.util.updateQueryData(
                "getProfile",
                undefined,
                (draft) => {
                  draft.authenticated = true;
                  draft.user = updatedUser;
                },
              ),
            );
          }
        } catch {
          // UI component handles error toast
        }
      },

      invalidatesTags: ["User"],
    }),

    // ── POST /profile/passwordchange ──────────────────────────────────
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordPayload
    >({
      query: (payload) => ({
        url: "/profile/passwordchange",
        method: "POST",
        body: payload,
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileUpdateApi;

export default profileUpdateApi;
