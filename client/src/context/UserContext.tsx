import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { BACKEND_BASE } from "@/config";
import { User } from "@/types/user";
import { useLocation } from "wouter";

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [location] = useLocation();

 useEffect(() => {
    if (location === "/login") return; // <-- Skip user fetch on login page
    axiosInstance.get(`${BACKEND_BASE}/api/user/me`)
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [location]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};