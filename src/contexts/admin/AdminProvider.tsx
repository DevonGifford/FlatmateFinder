import React, { createContext, useState } from "react";
import { AdminProfile } from "@/lib/types/admin-type";

export type AdminContextType = {
  adminProfile: AdminProfile | null;
  setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile | null>>;
  signOut: () => void;
};

export const AdminContext = createContext<AdminContextType>({
  adminProfile: null,
  setAdminProfile: () => {},
  signOut: () => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);

  const signOut = () => {
    setAdminProfile({ isAdmin: false, name: "" });
  };

  return (
    <AdminContext.Provider value={{ adminProfile, signOut, setAdminProfile }}>
      {children}
    </AdminContext.Provider>
  );
};