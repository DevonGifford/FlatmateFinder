import React, { createContext, useState } from "react";

// Define the available languages
export type Language = "english" | "spanish";

// Create the context
export type LanguageContextType = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "english", // Set a default language
  setLanguage: () => {},
});


// Create the context provider
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("english"); // Set a default language

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
