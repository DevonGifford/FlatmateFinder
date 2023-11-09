"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicantProfile } from "@/lib/types/applicant-type";
import { createApplicantDoc } from "@/lib/firebase/firestore";
import { useApplicantContext } from "../contexts/applicant/useApplicantContext";
import { toastError, toastFormComplete } from "@/lib/customToast";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Building, Check, Home, Video } from "lucide-react";
import { Spinner } from "../Spinner";
import { ThirdFormData } from "@/lib/types/translation-types";
import Data_EN from "@/lib/translations/applicant-form/thirdform_en.json";
import Data_ES from "@/lib/translations/applicant-form/thirdform_es.json";
import { useLanguageContext } from "../contexts/language/useLanguageContext";
// import { createApplicantDoc } from "@/lib/firebase/firestore";

// 👇 FORM SCHEMA : Account Form
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
  photo: z.string().optional(),
});
type ThirdFormValues = z.infer<typeof thirdFormSchema>;

export function ThirdForm() {
  const navigate = useNavigate();
  const { updateApplicantContext, applicantProfile } = useApplicantContext();
  const { language } = useLanguageContext();
  const [isLoading, setIsLoading] = useState(false); //- handle button loadingSpinner
  const [submitted, setSubmitted] = useState(false); //- handle button-icon success

  // ✅ SET CURRENT LANGUAGE:  access language from the context
  const setLanguage: ThirdFormData = language === "english" ? Data_EN : Data_ES;

  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<ThirdFormValues>({
    resolver: zodResolver(thirdFormSchema),
  });

  //   🎯 Handle Image Storage Upload 💣 COMPLETE THIS OR REMOVE THIS
  // - Upload to storage
  // - Create local state to hold url
  // - submit form with state.
  // - uploade to firestore
  // - return the url string

  // ✅ SUBMIT FORM - submit account form
  async function onSubmit(data: ThirdFormValues) {
    console.log("thirdForm/Submit:  💢 Triggered", data);

    setIsLoading(true);

    if (applicantProfile) {
      // 👇 Create a uuid for the user
      //- Generate a unique ID for the user
      const secretVar = import.meta.env.VITE_SECRET_VARIABLE;
      const nameFirstFive = applicantProfile.firstForm.name
        .slice(0, 5)
        .replace(/\s/g, ""); // Extract first 5 letters and remove spaces
      const currentTimeStamp = Date.now().toString().slice(-5); // Extract last 5 digits of current timestamp

      //-Construct a custom ID combining name, secret variable, and timestamp
      const documentId = `${nameFirstFive}-${secretVar}-${currentTimeStamp}`;

      try {
        // 👇 Merge form data with context data
        const updatedThirdForm = {
          ...applicantProfile.thirdForm,
          ...data,
          photo: "", //🎯💣 Temporary solution for if photo
        };

        const updatedProfile: ApplicantProfile = {
          ...applicantProfile,
          thirdForm: updatedThirdForm,
          uuid: documentId,
        };

        // 👇 Update the userContext with the merged data
        await updateApplicantContext(updatedProfile);
        console.log("✔ updated user context");

        // -👇 Create new Firestore db doc
        console.log(
          "updating the DB now - here is the data, newApplicantProfile",
          updatedProfile
        );
        await createApplicantDoc(documentId, updatedProfile);
        console.log("✔ created firestore doc");

        // ✔ Handle success
        // 🎯💣 TRY BLOCK:  UPDATE FIRESTORE DOCUMENT HERE ....
        setTimeout(() => {
          setIsLoading(false); //- Reset loading state
          setSubmitted(true); //- Set achieved state
          setSubmitted(false); //- Reset achieved state after a while
          toastFormComplete("3");
          navigate("/thankyou"); //-change route
        }, 1000);
      } catch (error) {
        // ✖ Handle errors
        setIsLoading(false); //- Reset loading state
        setTimeout(() => {
          setSubmitted(false); //- Reset achieved state after a while
        }, 2000);
        toastError();
      }
    } else {
      console.log("Error:  cannot access applicant context");
      setIsLoading(false); //- Reset loading state
      setTimeout(() => {
        setSubmitted(false); //- Reset achieved state after a while
      }, 2000);
      toastError();
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
        {/* JOB */}
        <div className="flex flex-col rounded-lg border">
          {/* JOB TITLE */}
          <FormField
            name="job_title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="border-none pb-0">
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

          {/* TYPE OF VIEWING */}
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
              <FormLabel>{setLanguage.tellMoreTitle}</FormLabel>
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
              <FormLabel>{setLanguage.hobbiesTitle}</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 💣 upload image */}
        <div className="grid w-full items-center gap-2 rounded-lg border p-4">
          <Label htmlFor="picture" className="py-2">
            {setLanguage.picTitle}
          </Label>
          <Input
            id="picture"
            type="file"
            placeholder={`${setLanguage.picPlaceHolder}`}
          />
        </div>

        {/* BUTTONS */}
        <Button
          type="submit"
          className="rounded-lg text-sm md:text-base lg:text-xl p-4 px-8 md:px-16 md:py-6"
          size={"lg"}
        >
          {/* <Spinner/> */}
          {isLoading ? (
            <Spinner />
          ) : submitted ? (
            <Check />
          ) : (
            `${setLanguage.completeButton}`
          )}
        </Button>
      </form>
    </Form>
  );
}
