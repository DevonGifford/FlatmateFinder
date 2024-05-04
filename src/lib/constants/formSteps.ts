export const formSteps = [
  { id: "first-form", path: "/form" },
  { id: "second-form", path: "/form?pageId=second-form" },
  { id: "third-form", path: "/form?pageId=third-form" },
] as const;

export type FormStep = (typeof formSteps)[number]["id"];

export const getFormStepPath = (step: FormStep) =>
  formSteps.find(({ id }) => id === step)?.path ?? formSteps[0].path;
