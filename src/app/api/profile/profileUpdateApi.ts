// import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// import { baseApi } from "../baseApi";
// import type { AuthUser, MeResponse } from "@/types/auth";
// import { clearAuthUser, setAuthUser } from "../auth/authSlice";

// export type ProfileUpdatePayload = {
//   name?: string;
//   last_name?: string;
//   phone?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   zip_code?: string;
//   bio?: string;
//   languages?: string[];
//   password?: string;
//   password_confirmation?: string;
//   image?: File | null;
// };

// export type ProfileUpdateResponse = {
//   message?: string;
//   user?: AuthUser;
//   success?: boolean;
// };

// const parseJson = async (response: Response) => {
//   const text = await response.text();

//   if (!text) return null;

//   try {
//     return JSON.parse(text);
//   } catch {
//     return text;
//   }
// };

// const createFetchError = (
//   status: number | "FETCH_ERROR",
//   dataOrMessage: unknown,
// ): FetchBaseQueryError => {
//   if (status === "FETCH_ERROR") {
//     return {
//       status: "FETCH_ERROR",
//       error:
//         dataOrMessage instanceof Error
//           ? dataOrMessage.message
//           : String(dataOrMessage || "Request failed"),
//     };
//   }

//   return {
//     status,
//     data: dataOrMessage,
//   };
// };

// const buildProfileFormData = (payload: ProfileUpdatePayload) => {
//   const formData = new FormData();

//   if (payload.name !== undefined) formData.append("name", payload.name);
//   if (payload.last_name !== undefined) {
//     formData.append("last_name", payload.last_name);
//   }
//   if (payload.phone !== undefined) formData.append("phone", payload.phone);
//   if (payload.address !== undefined) {
//     formData.append("address", payload.address);
//   }
//   if (payload.city !== undefined) formData.append("city", payload.city);
//   if (payload.state !== undefined) formData.append("state", payload.state);
//   if (payload.zip_code !== undefined) {
//     formData.append("zip_code", payload.zip_code);
//   }
//   if (payload.bio !== undefined) formData.append("bio", payload.bio);

//   if (payload.languages?.length) {
//     payload.languages.forEach((language) => {
//       formData.append("languages[]", language);
//     });
//   }

//   if (payload.password) {
//     formData.append("password", payload.password);
//   }

//   if (payload.password_confirmation) {
//     formData.append("password_confirmation", payload.password_confirmation);
//   }

//   if (payload.image) {
//     formData.append("image", payload.image);
//   }

//   return formData;
// };

// const profileUpdateApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getProfile: builder.query<MeResponse, void>({
//       queryFn: async () => {
//         try {
//           const response = await fetch("/api/auth/me", {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//             },
//             credentials: "include",
//             cache: "no-store",
//           });

//           const data = await parseJson(response);

//           if (!response.ok) {
//             return {
//               error: createFetchError(response.status, data),
//             };
//           }

//           return {
//             data: data as MeResponse,
//           };
//         } catch (error) {
//           return {
//             error: createFetchError("FETCH_ERROR", error),
//           };
//         }
//       },

//       onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
//         try {
//           const { data } = await queryFulfilled;

//           if (data?.authenticated && data.user) {
//             dispatch(setAuthUser(data.user));
//           } else {
//             dispatch(clearAuthUser());
//           }
//         } catch {
//           dispatch(clearAuthUser());
//         }
//       },

//       providesTags: ["User"],
//     }),

//     updateProfile: builder.mutation<
//       ProfileUpdateResponse,
//       ProfileUpdatePayload
//     >({
//       queryFn: async (payload) => {
//         try {
//           const hasImage = payload.image instanceof File;

//           const body = hasImage
//             ? buildProfileFormData(payload)
//             : JSON.stringify({
//                 name: payload.name,
//                 last_name: payload.last_name,
//                 phone: payload.phone,
//                 address: payload.address,
//                 city: payload.city,
//                 state: payload.state,
//                 zip_code: payload.zip_code,
//                 bio: payload.bio,
//                 languages: payload.languages || [],
//                 ...(payload.password
//                   ? {
//                       password: payload.password,
//                       password_confirmation: payload.password_confirmation,
//                     }
//                   : {}),
//               });

//           const response = await fetch("/api/profile/update", {
//             method: "PUT",
//             headers: hasImage
//               ? {
//                   Accept: "application/json",
//                 }
//               : {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                 },
//             credentials: "include",
//             body,
//           });

//           const data = await parseJson(response);

//           if (!response.ok) {
//             return {
//               error: createFetchError(response.status, data),
//             };
//           }

//           return {
//             data: data as ProfileUpdateResponse,
//           };
//         } catch (error) {
//           return {
//             error: createFetchError("FETCH_ERROR", error),
//           };
//         }
//       },

//       onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
//         try {
//           const { data } = await queryFulfilled;

//           if (data?.user) {
//             dispatch(setAuthUser(data.user));
//           }
//         } catch {
//           // UI component handles error toast
//         }
//       },

//       invalidatesTags: ["User"],
//     }),
//   }),

//   overrideExisting: true,
// });

// export const { useGetProfileQuery, useUpdateProfileMutation } =
//   profileUpdateApi;

// export default profileUpdateApi;

import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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

const parseJson = async (response: Response) => {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const createFetchError = (
  status: number | "FETCH_ERROR",
  dataOrMessage: unknown,
): FetchBaseQueryError => {
  if (status === "FETCH_ERROR") {
    return {
      status: "FETCH_ERROR",
      error:
        dataOrMessage instanceof Error
          ? dataOrMessage.message
          : String(dataOrMessage || "Request failed"),
    };
  }

  return {
    status,
    data: dataOrMessage,
  };
};

const getUpdatedUserFromResponse = (
  response?: ProfileUpdateResponse,
): AuthUser | undefined => {
  if (response?.user) {
    return response.user;
  }

  if (response?.data?.user) {
    return response.data.user;
  }

  return undefined;
};

const buildProfileFormData = (payload: ProfileUpdatePayload) => {
  const formData = new FormData();

  if (payload.name !== undefined) {
    formData.append("name", payload.name);
  }

  if (payload.last_name !== undefined) {
    formData.append("last_name", payload.last_name);
  }

  if (payload.phone !== undefined) {
    formData.append("phone", payload.phone);
  }

  if (payload.address !== undefined) {
    formData.append("address", payload.address);
  }

  if (payload.city !== undefined) {
    formData.append("city", payload.city);
  }

  if (payload.state !== undefined) {
    formData.append("state", payload.state);
  }

  if (payload.zip_code !== undefined) {
    formData.append("zip_code", payload.zip_code);
  }

  if (payload.bio !== undefined) {
    formData.append("bio", payload.bio);
  }

  if (payload.languages?.length) {
    payload.languages.forEach((language) => {
      formData.append("languages[]", language);
    });
  } else {
    formData.append("languages", JSON.stringify([]));
  }

  if (payload.password) {
    formData.append("password", payload.password);
  }

  if (payload.password_confirmation) {
    formData.append("password_confirmation", payload.password_confirmation);
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
};

const buildProfileJsonBody = (payload: ProfileUpdatePayload) => {
  return JSON.stringify({
    name: payload.name,
    last_name: payload.last_name,
    phone: payload.phone,
    address: payload.address,
    city: payload.city,
    state: payload.state,
    zip_code: payload.zip_code,
    bio: payload.bio,
    languages: payload.languages || [],
    ...(payload.password
      ? {
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        }
      : {}),
  });
};

const profileUpdateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<MeResponse, void>({
      queryFn: async () => {
        try {
          const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as MeResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
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

    updateProfile: builder.mutation<
      ProfileUpdateResponse,
      ProfileUpdatePayload
    >({
      queryFn: async (payload) => {
        try {
          const hasImage = payload.image instanceof File;

          const body = hasImage
            ? buildProfileFormData(payload)
            : buildProfileJsonBody(payload);

          const response = await fetch("/api/profile/update", {
            method: "PUT",
            headers: hasImage
              ? {
                  Accept: "application/json",
                }
              : {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
            credentials: "include",
            body,
          });

          const data = await parseJson(response);

          if (!response.ok) {
            return {
              error: createFetchError(response.status, data),
            };
          }

          return {
            data: data as ProfileUpdateResponse,
          };
        } catch (error) {
          return {
            error: createFetchError("FETCH_ERROR", error),
          };
        }
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
  }),

  overrideExisting: true,
});

export const { useGetProfileQuery, useUpdateProfileMutation } =
  profileUpdateApi;

export default profileUpdateApi;