export type AdminProfile = {
  isAdmin: boolean;
  name: string;
};

export const defaultAdmin: AdminProfile = {
  isAdmin: true,
  name: "Alpha User",
};
