import React from "react";

type RatingBadgeProps = {
  boolValue: boolean | undefined;
  starValue: number | undefined;
};

const RatingBadge: React.FC<RatingBadgeProps> = ({ boolValue, starValue }) => {
  const bgColor = boolValue ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${bgColor} text-white p-2 rounded-full justify-center w-10 h-10 text-center items-center`}
    >
      <p className="text-xl -translate-y-0.5">{starValue}</p>
    </div>
  );
};

export default RatingBadge;
