import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toastCorrectPassword, toastIncorrectPassword } from "@/lib/customToast";

const FormSchema = z.object({
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function HomePage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  // 🎯 Handle start form
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { password } = data;

    //-check if form entry matches secret passwords
    switch (password) {
      case import.meta.env.VITE_PASSWORD_DASHBOARD:
        console.log("Existing tenant login");
        navigate("/dashboard");
        break;

      case import.meta.env.VITE_PASSWORD_ALPHA:
      case import.meta.env.VITE_PASSWORD_BETA:
      case import.meta.env.VITE_PASSWORD_MANGO:
      case import.meta.env.VITE_PASSWORD_CHOCOLATE:
        //-💣 Handle user creation and Firestore document creation
        //-   implement the logic to create users and Firestore documents here
        // const uniqueId = `${Date.now()}`;

        //-💣 Instantiate a new context version with this new user uuid

        // - Handle Success case
        toastCorrectPassword();
        navigate("/form"); // Use navigate here directly
        break;

      default:
        // -  Handle incorrect password case
        toastIncorrectPassword();  //-🍞custom toast
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* HEADER SPLASH */}
      <header className="flex flex-col pt-3 items-center">
        <span className="font-semibold">Welcome to</span>
      </header>
      <h1 className=" text-flipdish-blue text-2xl md:text-3xl lg:text-4xl tracking-wide font-extrabold py-5 mx-10">
        Calle de Muller, 1
      </h1>

      {/* SPLASH IMAGE */}
      <AspectRatio ratio={16 / 9} className="flex flex-row">
        <img src="/Tetuan-Splash.jpg" className="rounded-3xl" />
      </AspectRatio>

      {/* PASSWORD FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 py-10"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-3xl font-bold">
                  Enter password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    className="text-center"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter the password shared with you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Start</Button>
        </form>
      </Form>
    </div>
  );
}
