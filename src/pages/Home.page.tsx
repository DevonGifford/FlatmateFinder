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
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 py-8 sm:px-8 md:gap-10 md:py-12">
      <header className="flex max-w-2xl flex-col items-center gap-2 text-center">
        <span className="text-xl italic text-muted-foreground sm:text-2xl">
          {localeData.subHeading}
        </span>
        <h1 className="text-3xl font-extrabold tracking-wide sm:text-4xl lg:text-5xl">
          {localeData.mainHeading}
        </h1>
      </header>

      <img
        src="/Tetuan-Splash.jpg"
        alt="Tetuan neighborhood"
        className="aspect-[4/3] w-full max-w-xl rounded-2xl object-cover shadow-lg"
        width={500}
        height={375}
      />

      <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full text-center text-xl font-bold sm:text-2xl">
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
                  <FormDescription className="text-center">
                    {localeData.passwordDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {localeData.startButton}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
