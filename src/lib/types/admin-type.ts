export type AdminProfile = {
  isAdmin: boolean;
  uuid: string;
  name: string;
};

export const defaultAdmin: AdminProfile = {
  isAdmin: true,
  uuid: "alphauser0000", // Replace with a unique identifier generation logic
  name: "Alpha User",
};
