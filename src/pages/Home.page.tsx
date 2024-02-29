import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalDispatch } from "@/lib/hooks/useGlobalDispatch";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

import { HomePageData } from "@/lib/interfaces/localeInterfaces";
import Data_EN from "@/lib/translations/home-page/home_en.json";
import Data_ES from "@/lib/translations/home-page/home_es.json";

const FormSchema = z.object({
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { locale } = useGlobalState();
  const localeData: HomePageData = locale === "EN" ? Data_EN : Data_ES;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { password } = data;
    switch (password) {
      // ✔  Tenant Password Check
      case import.meta.env.VITE_PASSWORD_UNO:
      case import.meta.env.VITE_PASSWORD_DOS:
      case import.meta.env.VITE_PASSWORD_TRES:
        dispatch({
          type: "SET_TENANT",
        });
        handleTenantLogin(password);
        break;
      // ✔  Applicant Password Check
      case import.meta.env.VITE_PASSWORD_ALPHA:
      case import.meta.env.VITE_PASSWORD_BETA:
      case import.meta.env.VITE_PASSWORD_MANGO:
      case import.meta.env.VITE_PASSWORD_CHOCOLATE:
        dispatch({
          type: "SET_APPLICANT",
        });
        toastCorrectPassword();
        navigate("/form");
        break;
      // ✖  Incorrect password case
      default:
        toastIncorrectPassword();
        break;
    }
  }

  function handleTenantLogin(password: string) {
    const passwordPayloadMap: Record<string, string> = {
      [import.meta.env.VITE_PASSWORD_UNO]: import.meta.env.VITE_PASSWORD_ONE,
      [import.meta.env.VITE_PASSWORD_DOS]: import.meta.env.VITE_PASSWORD_TWO,
      [import.meta.env.VITE_PASSWORD_TRES]: import.meta.env.VITE_PASSWORD_THREE,
    };
    const payload = passwordPayloadMap[password];
    if (payload) {
      dispatch({
        type: "SET_TENANT_PROFILE",
        payload,
      });
    }
    navigate("/admin-welcome");
  }

  return (
    <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
      <header className="flex flex-col pt-3 items-center md:pt-10">
        <span className="text-2xl italic ">{localeData.subHeading}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-wide font-extrabold pb-5 mx-10">
          {localeData.mainHeading}
        </h1>
      </header>

      <img
        src="/Tetuan-Splash.jpg"
        alt="splash-image"
        className="rounded-full"
        width={"500px"}
      />

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
                  {localeData.passwordLabel}
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
                  {localeData.passwordDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{localeData.startButton}</Button>
        </form>
      </Form>
    </div>
  );
}
