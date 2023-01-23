import { useDatabase } from "@/contexts/database/useDatabaseContext";

export const ErrorMessage = () => {
  const { error } = useDatabase();

  return (
    <p className="text-2xl">
      <span>⛔️</span>
      {error}
      <span>⛔️</span>
    </p>
  );
};
