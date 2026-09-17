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

export function toastError(message?: string) {
  toast({
    variant: "destructive",
    title: "Uh oh! 🙈",
    description: message
      ? `${message}`
      : "Try again later - Inténtalo más tarde",
  });
}

type FormNumber = 1 | 2 | 3;

export function toastFormComplete(formNumber: FormNumber) {
  toast({
    variant: "form",
    title: "✔",
    description: `${formNumber}/3.`,
  });
}

export function toastSuccess(message?: string) {
  toast({
    variant: "form",
    title: "✔",
    description: `${message}`,
  });
}
