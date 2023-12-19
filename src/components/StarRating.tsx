import { StarIcon } from "lucide-react";

interface StarIconProps {
  filled: boolean;
  onClick: () => void;
}

const StarRating = ({ filled, onClick }: StarIconProps) => {
  const fillColor = filled ? "text-yellow-500 fill-yellow-400" : "";

  return (
    <StarIcon
      className={`transition ease-in-out duration-150 hover:scale-125 ${fillColor}`}
      onClick={onClick}
    />
  );
};

export default StarRating;
