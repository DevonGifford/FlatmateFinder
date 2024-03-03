import { useGlobalState } from "@/lib/hooks/useGlobalState";

export const ErrorMessage = () => {
  const { error } = useGlobalState();

  return (
    <p className="text-2xl">
      <span>⛔️</span>
      {error}
      <span>⛔️</span>
    </p>
  );
};
