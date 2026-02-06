import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Home, Link, Video } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Spinner } from "@/components/custom/Spinner";
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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGlobalState } from "@/hooks/useGlobalState";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { createApplicantDoc } from "@/lib/firebase/firestore";
import { getValidationMessages } from "@/lib/forms/formUtils";
import { normalizeExternalUrl } from "@/lib/utils";
import Data_EN from "@/locales/applicant-form/third-form_en.json";
import Data_ES from "@/locales/applicant-form/third-form_es.json";
import {
  ApplicationInterface,
  defaultApplication,
} from "@/types/application";
import { isApplicantSession } from "@/types/globalState";
import type { ThirdFormData } from "@/types/locale";

type ThirdFormValues = {
  job_title: string;
  job_type?: string;
  describe: string;
  hobbies: string;
  social_media?: string;
};

const thirdFormSchema = (
  locale: "EN" | "ES",
): z.ZodType<ThirdFormValues, ThirdFormValues> => {
  const { required, tooLong, invalidUrl } = getValidationMessages(locale);

  return z.object({
    job_title: z.string({ error: required }).trim().min(1, required),
    job_type: z.string().optional(),
    describe: z
      .string({ error: required })
      .trim()
      .min(1, required)
      .max(500, tooLong),
    hobbies: z
      .string({ error: required })
      .trim()
      .min(1, required)
      .max(500, tooLong),
    social_media: z
      .string()
      .trim()
      .max(2048, tooLong)
      .refine((value) => normalizeExternalUrl(value) !== null, invalidUrl)
      .transform((value) => normalizeExternalUrl(value) ?? "")
      .optional(),
  });
};

interface ThirdFormProps {
  application: ApplicationInterface | null;
  setApplication: Dispatch<SetStateAction<ApplicationInterface>>;
}

export function ThirdForm({ application, setApplication }: ThirdFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { locale, session } = useGlobalState();
  const localeData: ThirdFormData = locale === "EN" ? Data_EN : Data_ES;

  const form = useForm<ThirdFormValues>({
    resolver: zodResolver(thirdFormSchema(locale)),
    defaultValues: application!.thirdForm,
  });

  async function onSubmit(data: ThirdFormValues) {
    try {
      setIsLoading(true);
      if (!application) {
        throw new Error("Error: cannot access applicant context");
      }

      const updatedThirdForm = {
        ...application.thirdForm,
        ...data,
        social_media: data.social_media || "", //normalize data
        job_type: data.job_type || "", //normalize data
      };

      const completedApplication: ApplicationInterface = {
        ...application,
        thirdForm: updatedThirdForm,
        photo: "",
      };
      if (isApplicantSession(session) && session.mode === "demo") {
        setIsLoading(false);
        toastFormComplete("3");
        setApplication(defaultApplication);
        navigate("/thankyou");
        return;
      }

      await createApplicantDoc(completedApplication, session);

      setIsLoading(false);
      toastFormComplete("3");
      setApplication(defaultApplication); // Reset application state
      navigate("/thankyou"); // Update route
    } catch (error) {
      setIsLoading(false);
      toastError();
      console.error("Error in submitting data", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="w-full space-y-8"
      >
        <div className="flex flex-col rounded-xl border border-border bg-card p-1 shadow-sm">
          <FormField
            name="job_title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="min-w-0 border-none pb-0 shadow-none">
                <FormLabel className="flex justify-center text-center">
                  {localeData.careerTitle}
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder=""
                    className="text-center sm:text-left"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="job_type"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rounded-lg border-none p-5 shadow-none">
                <FormControl>
                  <ToggleGroup
                    size="sm"
                    type="single"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="w-full flex-row justify-center gap-2 pt-2"
                  >
                    <ToggleGroupItem
                      value="wfh"
                      className="min-h-14 min-w-24 flex-col items-center justify-center gap-1 px-4 py-2 text-center aria-pressed:border-2 aria-pressed:border-primary aria-pressed:shadow-md focus-visible:ring-2"
                    >
                      <Home aria-hidden="true" />
                      <span className="text-xs">{localeData.wfh}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="hybrid"
                      className="min-h-14 min-w-24 flex-col items-center justify-center gap-1 px-4 py-2 text-center aria-pressed:border-2 aria-pressed:border-primary aria-pressed:shadow-md focus-visible:ring-2"
                    >
                      <Video aria-hidden="true" />
                      <span className="text-xs">{localeData.hybrid}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="office"
                      className="min-h-14 min-w-24 flex-col items-center justify-center gap-1 px-4 py-2 text-center aria-pressed:border-2 aria-pressed:border-primary aria-pressed:shadow-md focus-visible:ring-2"
                    >
                      <Building aria-hidden="true" />
                      <span className="text-xs">{localeData.office}</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* TELL US ABOUT YOURSELF */}
        <FormField
          name="describe"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-center gap-1 text-center">
                <FormLabel>{localeData.tellMoreTitle}</FormLabel>
                <FormDescription className="font-normal italic">
                  {localeData.tellMoreDescription}
                </FormDescription>
              </div>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* WHAT YOU DO FOR FUN */}
        <FormField
          name="hobbies"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-center gap-1 text-center">
                <FormLabel>{localeData.hobbiesTitle}</FormLabel>
                <FormDescription className="font-normal italic">
                  {localeData.hobbiesPlacholder}
                </FormDescription>
              </div>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="social_media"
          control={form.control}
          render={({ field }) => (
            <FormItem className="p-5">
              <div className="flex flex-col justify-center gap-1 text-center">
                <FormLabel>{localeData.social}</FormLabel>
                <FormDescription className="font-normal italic">
                  {localeData.optional}
                </FormDescription>
              </div>
              <div className="flex flex-row justify-between items-center gap-3">
                <Link
                  className="text-devready-green"
                  size={20}
                  aria-hidden="true"
                />
                <FormControl>
                  <Input placeholder="Instagram, LinkedIn etc." {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="min-h-11 w-full rounded-lg px-6 text-base font-semibold sm:px-16"
          size={"lg"}
        >
          {isLoading ? <Spinner /> : `${localeData.completeButton}`}
        </Button>
      </form>
    </Form>
  );
}
