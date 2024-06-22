import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import { applicantAccess, tenantAccess } from "@/lib/auth/accessPasswords";
import {
  toastCorrectPassword,
  toastIncorrectPassword,
} from "@/lib/customToast";
import Data_EN from "@/locales/home-page/home_en.json";
import Data_ES from "@/locales/home-page/home_es.json";
import { HomePageData } from "@/types/localeInterfaces";

const FormSchema = z.object({
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false);
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
    const tenant = tenantAccess.find(
      (credential) => credential.password === password,
    );
    if (tenant) {
      handleTenantLogin(tenant);
      return;
    }

    if (
      applicantAccess.some((credential) => credential.password === password)
    ) {
      dispatch({ type: "SET_APPLICANT" });
      toastCorrectPassword();
      navigate("/form");
      return;
    }

    toastIncorrectPassword();
  }

  function handleTenantLogin(tenant: (typeof tenantAccess)[number]) {
    dispatch({ type: "SET_TENANT", payload: tenant.tenantId });
    navigate("/admin-welcome");
    toastCorrectPassword();
  }

  function handleDemoApplicant() {
    dispatch({ type: "SET_DEMO_APPLICANT" });
    navigate("/form");
  }

  function handleDemoTenant() {
    dispatch({ type: "SET_DEMO_TENANT", payload: "dev" });
    navigate("/admin-welcome");
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 py-8 sm:px-8 md:gap-6 md:py-12">
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
        decoding="async"
      />

      <div className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="border-0">
                  <FormLabel className="w-full justify-center text-center text-xl font-bold sm:text-2xl">
                    {localeData.passwordLabel}
                  </FormLabel>
                  <FormDescription className="text-center">
                    {localeData.passwordDescription}
                  </FormDescription>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder=""
                        className="pr-10 text-center"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={
                        showPassword
                          ? localeData.hidePassword
                          : localeData.showPassword
                      }
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {localeData.startButton}
            </Button>
          </form>
        </Form>

        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-muted-foreground">
              {localeData.demoPrompt}
            </p>
            <p className="text-xs italic text-muted-foreground">
              {localeData.demoPromptDescription}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoApplicant}
              className="transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              {localeData.demoApplicant}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoTenant}
              className="transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              {localeData.demoTenant}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
