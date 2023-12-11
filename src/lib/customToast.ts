import { toast } from "@/components/ui/use-toast";

export function toastCorrectPassword() {
  toast({
    variant: "default",
    title: "Correct",
    description: "Please complete the form - when done please click next.",
  });
}

export function toastIncorrectPassword() {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong",
    description: "That's not the right password.",
  });
}

export function toastFormComplete(formNumber: string) {
  toast({
    variant: "default",
    title: "Submitted",
    description: `You have completed ${formNumber}/3.`,
  });
}
