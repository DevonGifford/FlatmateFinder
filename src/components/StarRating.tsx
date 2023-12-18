// StarIcon.tsx
import { StarIcon } from "lucide-react";

interface StarIconProps {
  filled: boolean;
  onClick: () => void;
}

const StarRating = ({ filled, onClick }: StarIconProps) => {
  if (filled) {
    return <StarIcon className="text-yellow-500 fill-yellow-400 transition ease-in-out duration-150 hover:scale-125" onClick={onClick} />;
  } else {
    return <StarIcon className="transition ease-in-out duration-150 hover:scale-125" onClick={onClick} />;
  }
};

export default StarRating;
