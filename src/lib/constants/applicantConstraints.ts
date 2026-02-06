export const ratingRange = {
  min: 1,
  max: 5,
} as const;

// The slider stores its existing 0–100 scale, which the tenant UI maps to
// short, medium, and long stays.
export const lengthOfStayRange = {
  min: 0,
  max: 100,
} as const;
