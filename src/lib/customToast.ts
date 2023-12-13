import { toast } from "@/components/ui/use-toast";

export function toastCorrectPassword() {
  toast({
    variant: "form",
    title: "✔🔓",
    description: "Very good - Muy bien",
  });
}

export function toastIncorrectPassword() {
  toast({
    variant: "destructive",
    title: "Uh oh! 🔒",
    description: "That's not correct - Eso no está bien ",
  });
}

export function toastError() {
  toast({
    variant: "destructive",
    title: "Uh oh! 🙈",
    description: "Try again later - Inténtalo más tarde",
  });
}

export function toastFormComplete(formNumber: string) {
  toast({
    variant: "form",
    title: "✔",
    description: `${formNumber}/3.`,
  });
}
