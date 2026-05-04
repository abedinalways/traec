import { baseApi } from "@/redux/api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      {
        success?: boolean;
        message?: string;
        data?: { email: string; requires_verification: boolean };
      },
      {
        name: string;
        last_name: string;
        email: string;
        password: string;
        password_confirmation: string;
        otp?: string;
      }
    >({
      query: (data) => ({
        url: "/user-register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation<{ success?: boolean; message?: string }, void>(
      {
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        invalidatesTags: ["User"],
      },
    ),
    forgotPassword: builder.mutation<
      { success?: boolean; message?: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<
      { success?: boolean; message?: string },
      { old_password: string; new_password: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resendVerificationEmail: builder.mutation<
      { success?: boolean; message?: string },
      { email: string }
    >({
      query: (data) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<
      { success?: boolean; message?: string },
      { email: string; token: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
export default authApi;
