import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

// import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import {
  toastCorrectPassword,
  toastIncorrectPassword,
} from "@/lib/customToast";
import {
  createApplicantDoc,
} from "@/lib/firebase/firestore";
import { defaultApplicant } from "@/lib/types/applicant-type";

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
        toastIncorrectPassword(); //-🍞custom toast
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
      {/* HEADER SPLASH */}
      <header className="flex flex-col pt-3 items-center md:pt-10">
        <span className="text-2xl italic ">Welcome to</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-wide font-extrabold pb-5 mx-10">
          Calle de Muller
        </h1>
      </header>

      {/* SPLASH IMAGE */}
      {/* <AspectRatio ratio={16 / 9} className="flex items-center justify-center"> */}
      <img src="/Tetuan-Splash.jpg" className="rounded-full" width={"500px"} />
      {/* </AspectRatio> */}

      {/* PASSWORD FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-5/12 space-y-6 py-5"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="px-8">
                <FormLabel className="text-xl sm:text-3xl font-bold">
                  Enter password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className="text-center"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A secret password shared with you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Start</Button>
        </form>
      </Form>

      <Button
        size={"default"}
        variant={"destructive"}
        className="p-4 px-8"
        onClick={() => {
          createApplicantDoc(defaultApplicant);
          console.log("it has been done...");
        }}
      >
        Add new Doc Button
      </Button>
    </div>
  );
}
