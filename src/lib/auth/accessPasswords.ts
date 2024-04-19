export interface AccessCredential {
  password: string | undefined;
  displayName?: string;
}

export const tenantAccess: AccessCredential[] = [
  {
    password: import.meta.env.VITE_PASSWORD_UNO,
    displayName: import.meta.env.VITE_PASSWORD_ONE,
  },
  {
    password: import.meta.env.VITE_PASSWORD_DOS,
    displayName: import.meta.env.VITE_PASSWORD_TWO,
  },
  {
    password: import.meta.env.VITE_PASSWORD_TRES,
    displayName: import.meta.env.VITE_PASSWORD_THREE,
  },
];

export const applicantAccess: AccessCredential[] = [
  { password: import.meta.env.VITE_PASSWORD_ALPHA },
  { password: import.meta.env.VITE_PASSWORD_BETA },
  { password: import.meta.env.VITE_PASSWORD_MANGO },
  { password: import.meta.env.VITE_PASSWORD_CHOCOLATE },
];
