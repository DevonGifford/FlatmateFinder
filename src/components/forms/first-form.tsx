import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { useGlobalState } from "@/hooks/useGlobalState";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
} from "@/components/ui/select";

import { languages } from "@/lib/constants/constants";
import { ApplicationInterface } from "@/types/applicationInterfaces";
import { FirstFormData } from "@/types/localeInterfaces";
import { getFormStepPath } from "@/lib/constants/formSteps";
import {
  getValidationMessages,
  mergeApplicationSection,
} from "@/lib/forms/formUtils";

import Data_EN from "@/locales/applicant-form/firstform_en.json";
import Data_ES from "@/locales/applicant-form/firstform_es.json";

type FirstFormValues = {
  name: string;
  age: string;
  sex: string;
  phone: string;
  languages?: string[];
};

const firstFormSchema = (
  locale: "EN" | "ES"
): z.ZodType<FirstFormValues, FirstFormValues> => {
  const { required, tooLong } = getValidationMessages(locale);

  return z.object({
    name: z.string({ error: required }).trim().min(1, required).max(50, tooLong),
    age: z.string({ error: required }).trim().min(1, required).max(10, tooLong),
    sex: z.string({ error: required }).trim().min(1, required).max(10, tooLong),
    phone: z.string({ error: required }).trim().min(1, required).max(16, tooLong),
    languages: z.array(z.string()).optional(),
  });
};

interface FirstFormProps {
  application: ApplicationInterface | null;
  setApplication: Dispatch<SetStateAction<ApplicationInterface>>;
}

export function FirstForm({ application, setApplication }: FirstFormProps) {
  const navigate = useNavigate();
  const { locale } = useGlobalState();
  const localeData: FirstFormData = locale === "EN" ? Data_EN : Data_ES;

  const defaultValues: FirstFormValues = application!.firstForm;
  const form = useForm<FirstFormValues>({
    resolver: zodResolver(firstFormSchema(locale)),
    defaultValues,
  });

  function onSubmit(data: FirstFormValues) {
    try {
      mergeApplicationSection(setApplication, "firstForm", data);

      toastFormComplete("1");
      navigate(getFormStepPath("second-form"));
    } catch {
      toastError();
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
                {localeData.name}
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
                {localeData.spoken}
                <p className="text-xs font-thin italic">
                  {localeData.optional}
                </p>
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  size="sm"
                  type="multiple"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  className="w-full justify-center"
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
        <div className="flex flex-row justify justify-evenly">
          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rounded-lg border p-4">
                <FormLabel>{localeData.gender}</FormLabel>
                <FormControl>
                  <ToggleGroup
                    size="sm"
                    type="single"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="w-full justify-center"
                  >
                    <ToggleGroupItem
                      value="male"
                      className="aria-pressed:border-2 aria-pressed:border-primary"
                    >
                      <IoMale />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="female"
                      className="aria-pressed:border-2 aria-pressed:border-primary"
                    >
                      <IoFemale />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="other"
                      className="aria-pressed:border-2 aria-pressed:border-primary"
                    >
                      <IoMaleFemale />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="age"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col rounded-lg border p-4 px-8">
                <FormLabel>{localeData.age}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`${localeData.age}`} />
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

        <Button
          type="submit"
          className="rounded-lg text-sm md:text-base lg:text-xl p-4 px-8 md:px-12 md:py-6"
          size={"lg"}
        >
          {localeData.nextbutton}
        </Button>
      </form>
    </Form>
  );
}
