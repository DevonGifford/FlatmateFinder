"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguageContext } from "../contexts/language/useLanguageContext";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { useApplicantContext } from "../contexts/applicant/useApplicantContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { languages } from "@/lib/constants/constants";
import { ApplicantProfile } from "@/lib/types/applicant-type";
import { FirstFormData } from "@/lib/types/translation-types";

import Data_EN from "@/lib/translations/applicant-form/firstform_en.json";
import Data_ES from "@/lib/translations/applicant-form/firstform_es.json";

// 👇 FORM SCHEMA : Account Form
const firstFormSchema = z.object({
  name: z
    .string({
      required_error: "⚠",
    })
    .max(50, {
      message: "⚠ too long",
    }),
  age: z
    .string({
      required_error: "⚠",
    })
    .max(10, {
      message: "⚠ too long",
    }),
  sex: z
    .string({
      required_error: "⚠",
    })
    .max(10, {
      message: "⚠ too long",
    }),
  phone: z
    .string({
      required_error: "⚠",
    })
    .max(16, {
      message: "⚠ too long",
    }),
  languages: z.array(z.string()).optional(),
});
type FirstFormValues = z.infer<typeof firstFormSchema>;

export function FirstForm() {
  const navigate = useNavigate();
  const { updateApplicantContext, applicantProfile } = useApplicantContext();
  const { language } = useLanguageContext();

  // ✅ SET CURRENT LANGUAGE:  access language from the context
  const setLanguage: FirstFormData = language === "english" ? Data_EN : Data_ES;

  // ⏳ IF EXISTING USERDATA, UPDATE FORMS WITH DATAA
  console.log(" 🦺 applicantProfile", applicantProfile);
  // Check if applicantProfile exists and has the necessary data
  const defaultValues: FirstFormValues = applicantProfile?.firstForm || {
    name: "",
    age: "",
    sex: "",
    phone: "",
    languages: [], // Provide default values for arrays too, if needed
  };

  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<FirstFormValues>({
    resolver: zodResolver(firstFormSchema),
    defaultValues,
  });

  // ✅ SUBMIT FORM - submit account form
  function onSubmit(data: FirstFormValues) {
    console.log("firstform/Submit:  💢 Triggered", data);

    // 👇 Update the userContext with form data
    try {
      const formData: Partial<ApplicantProfile> = {
        firstForm: {
          ...data,
        },
      };
      updateApplicantContext(formData);

      // ✔ Handle success
      toastFormComplete("1");
      navigate(`/form?pageId=second-form`); //-chang route
    } catch (error) {
      // ✖ Handle errors
      toastError();
      //📌 db update at end of form flow
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="space-y-4 w-full  "
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex text-center justify-center">
                {setLanguage.name}
              </FormLabel>

              <FormControl>
                <Input placeholder="" className=" text-center" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex text-center justify-center sm:justify-start">
                Whatsapp
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
          name="languages"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {setLanguage.spoken}
                <p className="text-xs font-thin italic">
                  {setLanguage.optional}
                </p>
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  size="sm"
                  type="multiple"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  {languages.map((lang) => (
                    <ToggleGroupItem key={lang.label} value={lang.label}>
                      {lang.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GENDER + AGE */}
        <div className="flex flex-row justify justify-evenly">
          {/* Gender Selection */}
          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rounded-lg border p-4">
                <FormLabel>{setLanguage.gender}</FormLabel>
                <FormControl>
                  <ToggleGroup
                    size="sm"
                    type="single"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <ToggleGroupItem value="male">
                      <IoMale />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="female">
                      <IoFemale />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="other">
                      <IoMaleFemale />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age */}
          <FormField
            name="age"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4 px-8">
                <FormLabel>{setLanguage.age}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`${setLanguage.age}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 14 }, (_, index) => index + 23).map(
                      (age) => (
                        <SelectItem
                          key={age}
                          value={String(age)}
                          className="flex flex-row justify-center items-center"
                        >
                          {String(age)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* BUTTONS */}
        <Button
          type="submit"
          className="rounded-lg text-sm md:text-base lg:text-xl p-4 px-8 md:px-12 md:py-6"
          size={"lg"}
        >
          {setLanguage.nextbutton}
        </Button>
      </form>
    </Form>
  );
}
