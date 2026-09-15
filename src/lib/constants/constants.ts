// 👇 Profile-form
export const locations = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Spain", value: "ES" },
  { label: "Italy", value: "IT" },
  { label: "Australia", value: "AU" },
  { label: "Japan", value: "JP" },
  { label: "China", value: "CN" },
  { label: "India", value: "IN" },
  { label: "Brazil", value: "BR" },
  { label: "Mexico", value: "MX" },
  { label: "South Africa", value: "ZA" },
  { label: "Nigeria", value: "NG" },
  { label: "Russia", value: "RU" },
  { label: "South Korea", value: "KR" },
  { label: "Turkey", value: "TR" },
  { label: "Argentina", value: "AR" },
  { label: "Egypt", value: "EG" },
] as const;

export const languages = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Other", value: "more" },
] as const;

// 👇 Account-form
export const ageList = [
  { label: "23" },
  { label: "24" },
  { label: "25" },
  { label: "26" },
  { label: "27" },
  { label: "28" },
  { label: "29" },
  { label: "30" },
  { label: "31" },
  { label: "32" },
  { label: "33" },
  { label: "34" },
  { label: "35" },
  { label: "36" },
] as const;

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
