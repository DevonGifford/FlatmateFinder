import { StarIcon } from "lucide-react";

interface StarIconProps {
  filled: boolean;
  selected?: boolean;
  onClick: () => void;
  label: string;
}

export const StarRating = ({
  filled,
  selected = filled,
  onClick,
  label,
}: StarIconProps) => {
  const fillColor = filled ? "text-yellow-500 fill-yellow-400" : "";
  return (
    <button
      type="button"
      aria-label={label}
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className="rounded-sm p-1 transition ease-in-out duration-150 hover:scale-125 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <StarIcon className={`h-5 w-5 ${fillColor}`} aria-hidden="true" />
    </button>
  );
};
