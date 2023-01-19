"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useApplicantContext } from "@/components/contexts/applicant/useApplicantContext";
import { useLanguageContext } from "@/components/contexts/language/useLanguageContext";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/Spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Building, Home, Link, Video } from "lucide-react";
import { ApplicantProfile } from "@/lib/types/applicant-type";
import { createApplicantDoc } from "@/lib/firebase/firestore";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { ThirdFormData } from "@/lib/types/translation-types";

import Data_EN from "@/lib/translations/applicant-form/thirdform_en.json";
import Data_ES from "@/lib/translations/applicant-form/thirdform_es.json";

const thirdFormSchema = z.object({
  job_title: z.string({
    required_error: "⚠",
  }),
  job_type: z.string().optional(),
  describe: z
    .string({
      required_error: "⚠",
    })
    .max(500, {
      message: "⚠ too long",
    }),
  hobbies: z
    .string({
      required_error: "⚠",
    })
    .max(500, {
      message: "⚠ too long",
    }),
  social_media: z
    .string()
    .max(30, {
      message: "⚠ too long",
    })
    .optional(),
});
type ThirdFormValues = z.infer<typeof thirdFormSchema>;

export function ThirdForm() {
  const navigate = useNavigate();
  const { updateApplicantContext, applicantProfile } = useApplicantContext();
  const { language } = useLanguageContext();
  const [isLoading, setIsLoading] = useState(false);
  
  const setLanguage: ThirdFormData = language === "english" ? Data_EN : Data_ES;

  const form = useForm<ThirdFormValues>({
    resolver: zodResolver(thirdFormSchema),
  });

  async function onSubmit(data: ThirdFormValues) {
    setIsLoading(true);
    if (applicantProfile) {
      //- Generate a unique ID for the user
      const secretVar = import.meta.env.VITE_SECRET_VARIABLE;
      const nameFirstFive = applicantProfile.firstForm.name
        .slice(0, 5)
        .replace(/\s/g, ""); // Extract first 5 letters and remove spaces
      const currentTimeStamp = Date.now().toString().slice(-5); // Extract last 5 digits of current timestamp
      //-Construct a custom ID
      const documentId = `${nameFirstFive}-${secretVar}-${currentTimeStamp}`;

      try {
        // 👇 Merge form data with context data
        const updatedThirdForm = {
          ...applicantProfile.thirdForm,
          ...data,
          social_media: data.social_media || "",
        };
        const updatedProfile: ApplicantProfile = {
          ...applicantProfile,
          thirdForm: updatedThirdForm,
          uuid: documentId,
          photo: "",
        };

        // 👇 Update State & DB
        await updateApplicantContext(updatedProfile);
        await createApplicantDoc(documentId, updatedProfile);

        setIsLoading(false);
        toastFormComplete("3");
        navigate("/thankyou"); //-updating route
      } catch (error) {
        setIsLoading(false);
        toastError();
        console.error("Error in submitting data", error);
      }
    } else {
      setIsLoading(false);
      toastError();
      console.error("Error:  cannot access applicant context");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="space-y-6 w-full "
      >
        <div className="flex flex-col rounded-lg border">
          <FormField
            name="job_title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="border-none pb-0 min-w-[300px]">
                <FormLabel className="flex text-center justify-center">
                  {setLanguage.careerTitle}
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
              <FormItem className="rounded-lg border-none p-4">
                <FormControl>
                  <ToggleGroup
                    size="sm"
                    type="single"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="pt-2 flex flex-row justify-evenly"
                  >
                    <ToggleGroupItem
                      value="wfh"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Home />
                      <span className="text-xs">{setLanguage.wfh}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="hybrid"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Video />
                      <span className="text-xs">{setLanguage.hybrid}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="office"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Building />
                      <span className="text-xs">{setLanguage.office}</span>
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
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {setLanguage.tellMoreTitle}
                <p className="text-xs font-thin italic">
                  {setLanguage.tellMoreDescription}
                </p>
              </FormLabel>
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
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {setLanguage.hobbiesTitle}
                <p className="text-xs font-thin italic">
                  {setLanguage.hobbiesPlacholder}
                </p>
              </FormLabel>
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
            <FormItem className="rounded-lg border p-4">
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                <p>{setLanguage.social}</p>
                <p className="text-xs font-thin italic">
                  {setLanguage.optional}
                </p>
              </FormLabel>
              <div className="flex flex-row justify-between items-center gap-3">
                <Link className="text-devready-green" size={20} />
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
          className="rounded-lg text-sm md:text-base lg:text-xl p-4 px-8 md:px-16 md:py-6"
          size={"lg"}
        >
          {isLoading ? <Spinner /> : `${setLanguage.completeButton}`}
        </Button>
      </form>
    </Form>
  );
}
