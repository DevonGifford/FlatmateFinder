import React from "react";

interface RatingBadgeProps {
  boolValue: boolean | undefined;
  starValue: number | undefined;
  ariaLabel: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  boolValue,
  starValue,
  ariaLabel,
}) => {
  const color =
    boolValue === undefined
      ? "border border-border bg-muted text-muted-foreground"
      : boolValue
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white";

  return (
    <div
      className={`${color} flex h-8 w-8 items-center justify-center rounded-full p-2 text-center sm:h-10 sm:w-10`}
      role="img"
      aria-label={ariaLabel}
    >
      <p className="sm:text-xl -translate-y-1.5 sm:-translate-y-0.5">
        {starValue ?? "—"}
      </p>
    </div>
  );
};
