import React from "react";

type RatingBadgeProps = {
  boolValue: boolean | undefined;
  starValue: number | undefined;
};

const RatingBadge: React.FC<RatingBadgeProps> = ({ boolValue, starValue }) => {
  const bgColor = boolValue ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${bgColor} text-white p-2 rounded-full justify-center h-8 w-8 sm:h-10 sm:w-10 text-center items-center`}
    >
      <p className="sm:text-xl -translate-y-1.5 sm:-translate-y-0.5">
        {starValue}
      </p>
    </div>
  );
};

export default RatingBadge;
