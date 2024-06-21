import { useGlobalState } from "@/hooks/useGlobalState";

export const ErrorMessage = () => {
  const { error } = useGlobalState();

  return (
    <p className="text-2xl" role="alert">
      <span aria-hidden="true">⛔️</span>
      {error}
      <span aria-hidden="true">⛔️</span>
    </p>
  );
};
