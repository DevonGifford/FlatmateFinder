import type { Dispatch, SetStateAction } from "react";

import type { ApplicationInterface } from "@/types/application";

export function getValidationMessages(locale: "EN" | "ES") {
  return {
    required:
      locale === "EN" ? "Please complete this field." : "Completa este campo.",
    tooLong:
      locale === "EN"
        ? "Please use fewer characters."
        : "Usa menos caracteres.",
    invalidUrl:
      locale === "EN"
        ? "Enter a valid website URL."
        : "Introduce una URL válida.",
  };
}

export function mergeApplicationSection<
  Section extends "firstForm" | "secondForm" | "thirdForm",
>(
  setApplication: Dispatch<SetStateAction<ApplicationInterface>>,
  section: Section,
  values: Partial<ApplicationInterface[Section]>,
) {
  setApplication((currentApplication) => ({
    ...currentApplication,
    [section]: {
      ...currentApplication[section],
      ...values,
    },
  }));
}
