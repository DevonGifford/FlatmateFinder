import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguageContext } from "@/components/contexts/language/useLanguageContext";
import {
  toastCorrectPassword,
  toastIncorrectPassword,
} from "@/lib/customToast";
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

import Data_EN from "../lib/translations/home-page/home_en.json";
import Data_ES from "../lib/translations/home-page/home_es.json";
import { HomePageData } from "@/lib/types/translation-types";
import { useAdminContext } from "@/components/contexts/admin/useAdminContext";

// 👇 FORM SCHEMA : Home Page
const FormSchema = z.object({
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function HomePage() {
  const navigate = useNavigate();
  const { language } = useLanguageContext();
  const { validateAdmin } = useAdminContext();

  // ✅ SET CURRENT LANGUAGE:  access language from the context
  const setLanguage: HomePageData = language === "english" ? Data_EN : Data_ES;

  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  // ✅ SUBMIT PASSWORD - Handle start form or dashboard
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { password } = data;

    //-check if form entry matches secret passwords
    switch (password) {
      case import.meta.env.VITE_PASSWORD_DASHBOARD:
        console.log("👀 Existing tenant login");
        validateAdmin();
        navigate("/welcome-tenant");
        break;

      case import.meta.env.VITE_PASSWORD_ALPHA:
      case import.meta.env.VITE_PASSWORD_BETA:
      case import.meta.env.VITE_PASSWORD_MANGO:
      case import.meta.env.VITE_PASSWORD_CHOCOLATE:
        // ✔  Handle Success case
        toastCorrectPassword();
        navigate("/form"); // Use navigate here directly
        break;

      default:
        // ✖  Handle incorrect password case
        toastIncorrectPassword(); //-🍞custom toast
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
      {/* //👇 HEADER SPLASH */}
      <header className="flex flex-col pt-3 items-center md:pt-10">
        <span className="text-2xl italic ">{setLanguage.subHeading}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-wide font-extrabold pb-5 mx-10">
          {setLanguage.mainHeading}
        </h1>
      </header>

      {/*//👇  SPLASH IMAGE */}
      {/* <AspectRatio ratio={16 / 9} className="flex items-center justify-center"> */}
      <img src="/Tetuan-Splash.jpg" className="rounded-full" width={"500px"} />
      {/* </AspectRatio> */}

      {/*//👇  PASSWORD FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-5/12 space-y-6 py-5"
        >
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="px-8">
                <FormLabel className="text-xl sm:text-3xl font-bold">
                  {setLanguage.passwordLabel}
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
                  {setLanguage.passwordDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{setLanguage.startButton}</Button>
        </form>
      </Form>
    </div>
  );
}
