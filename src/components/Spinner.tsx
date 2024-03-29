import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

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
    <Loader
      className={cn(
        "text-muted-foreground animate-spin slower",
        spinnerVariants({ size })
      )}
      data-testid="spinner-svg" 
      role="progressbar" 
      aria-valuetext="Loading" 
      aria-busy="true" 
    />
  );
};
