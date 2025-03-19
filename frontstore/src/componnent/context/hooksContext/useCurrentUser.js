import { useState, useEffect, useCallback } from "react";
import apiRequest from "../../axios/axiosInstance";
import * as jwt_decode from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt_decode.jwtDecode(token);
    return Date.now() > decodedToken.exp * 1000;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return true;
  }
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState(null); 

  const handleError = (error, redirectOnUnauthorized = false) => {
    const errorMessage = error.response?.data?.message || "An error occurred";
    setErrorMessage(errorMessage);

    if (redirectOnUnauthorized && error.response?.status === 401) {
      logout();
    }
  };

  const fetchUser = useCallback(async () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if ( currentUser && lastFetched && now - lastFetched < oneHour) {
      return currentUser;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token found");
      return null;
    }

    setIsLoading(true);
    try {
      const res = await apiRequest.get("/users/getMe");
      setCurrentUser(res.data);
      setLastFetched(now);
      return res.data;
    } catch (err) {
      handleError(err, true);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, lastFetched]);

  const refreshToken = useCallback(async () => {
    try {
      const res = await apiRequest.post("/auth/refresh-token");
      const { accessToken } = res.data;
      localStorage.setItem("token", accessToken);

      // Seulement actualiser les données utilisateur si le cache est expiré
      if (!currentUser || isTokenExpired(accessToken)) {
        await fetchUser(true);
      }
    } catch (err) {
      handleError(err, true);
    }
  }, [currentUser, fetchUser]);

  const logout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("token");
      setCurrentUser(null);
      setLastFetched(null);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const handleTokenAndUser = async () => {
      const token = localStorage.getItem("token");

      if (!token || isTokenExpired(token)) {
        try {
          await refreshToken();
        } catch {
          console.error("Failed to refresh token on mount");
        }
      } else if (!currentUser) {
        await fetchUser(); 
      }
    };

    handleTokenAndUser();

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token && !isTokenExpired(token)) {
        refreshToken();
      }
    }, 3 * 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [fetchUser, refreshToken, currentUser]);

  return { currentUser, errorMessage,setCurrentUser, isLoading, fetchUser, logout, refreshToken };
};

