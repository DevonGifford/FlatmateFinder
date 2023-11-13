import React, { createContext, useState } from "react";

import { AdminProfile } from "@/lib/types/admin-type";

// Create the context
export type AdminContextType = {
  adminProfile: AdminProfile | null;
  setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile | null>>;
  isAdmin: () => Promise<boolean>;
  validateAdmin: () => Promise<void>;
};

export const AdminContext = createContext<AdminContextType>({
  adminProfile: null,
  setAdminProfile: () => {},
  isAdmin: async () => false,
  validateAdmin: async () => {},
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

  const validateAdmin = async () => {
    setAdminProfile({ isAdmin: true, uuid: "", name: "" });
  };

  return (
    <AdminContext.Provider
      value={{ adminProfile, isAdmin, setAdminProfile, validateAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};
