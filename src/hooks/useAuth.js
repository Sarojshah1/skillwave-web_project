

import { useEffect, useState } from "react";
import { storageService } from "../infrastructure/storage/authstorageService";
import { globalAuthService } from "../services/userServices";

export const useGlobalAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = storageService.getToken();
    const role = storageService.getRole();
    const id = storageService.getUserId();

    if (token) {
      setIsLoggedIn(true);
      setRole(role);
      setUserId(id);

      globalAuthService
        .fetchProfile()
        .then((data) => setProfile(data))
        .catch((err) => console.error("Failed to fetch profile", err));
    } else {
      setIsLoggedIn(false);
      setRole(null);
      setUserId(null);
      setProfile(null);
    }
  }, []);

  const logout = () => {
    storageService.clearAuthData();
    setIsLoggedIn(false);
    setRole(null);
    setUserId(null);
    setProfile(null);
  };

  return {
    isLoggedIn,
    role,
    userId,
    profile,
    logout,
  };
};
