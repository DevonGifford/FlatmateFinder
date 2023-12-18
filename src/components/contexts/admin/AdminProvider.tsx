import React, { createContext, useState } from "react";

import { AdminProfile } from "@/lib/types/admin-type";

// Create the context
export type AdminContextType = {
  adminProfile: AdminProfile | null;
  setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile | null>>;
  isAdmin: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

export const AdminContext = createContext<AdminContextType>({
  adminProfile: null,
  setAdminProfile: () => {},
  isAdmin: async () => false,
  signOut: async () => {},
});

// Create the context provider
export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);

  const isAdmin = async () => {
    if (adminProfile) {
      return true;
    } else {
      return false;
    }
  };

  const signOut = async () => {
    setAdminProfile({ isAdmin: false, name: "" });
  };

  return (
    <AdminContext.Provider
      value={{ adminProfile, isAdmin, signOut, setAdminProfile }}
    >
      {children}
    </AdminContext.Provider>
  );
};
