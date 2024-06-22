import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

type SpinnerProps = VariantProps<typeof spinnerVariants>;

const spinnerVariants = cva("text-muted-foreground animate-spin slower", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
      screen: "h-20 w-20",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center text-muted-foreground animate-spin slower",
        spinnerVariants({ size }),
      )}
      data-testid="spinner-svg"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-busy="true"
    >
      <Loader className="h-full w-full" aria-hidden="true" />
    </span>
  );
};
