"use client";


import { useAppDispatch, useAppSelector } from "../../store";
import { baseApi } from "../baseApi";
import { useLogoutUserMutation } from "./authapi";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { logOut, selectCurrentRole, selectCurrentToken, selectIsAuthenticated } from "./authSlice";



export const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const role = useAppSelector(selectCurrentRole);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const [logoutUser, logoutState] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutUser().unwrap();
      }
    } catch (error) {
      console.error(getErrorMessage(error, "Logout request failed."));
    } finally {
      dispatch(logOut());
      dispatch(baseApi.util.resetApiState());
    }
  };

  return {
    token,
    role,
    isAuthenticated,
  
    logOut: handleLogout,

    isLogoutLoading: logoutState.isLoading,

    logoutError: logoutState.error,
  };
};
