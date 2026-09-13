import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
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

import { HomePageData } from "@/types/localeInterfaces";
import Data_EN from "@/locales/home-page/home_en.json";
import Data_ES from "@/locales/home-page/home_es.json";
import { applicantAccess, tenantAccess } from "@/lib/auth/accessPasswords";

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
    const tenant = tenantAccess.find((credential) => credential.password === password);
    if (tenant) {
      dispatch({ type: "SET_TENANT" });
      handleTenantLogin(tenant);
      return;
    }

    if (applicantAccess.some((credential) => credential.password === password)) {
      dispatch({ type: "SET_APPLICANT" });
      toastCorrectPassword();
      navigate("/form");
      return;
    }

    toastIncorrectPassword();
  }

  function handleTenantLogin(tenant: (typeof tenantAccess)[number]) {
    if (tenant.displayName) {
      dispatch({
        type: "SET_TENANT_PROFILE",
        payload: tenant.displayName,
      });
    }
    navigate("/admin-welcome");
    toastCorrectPassword();
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
