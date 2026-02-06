import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoFemale, IoMale, IoMaleFemale } from "react-icons/io5";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGlobalState } from "@/hooks/useGlobalState";
import { languages } from "@/lib/constants/formOptions";
import { getFormStepPath } from "@/lib/constants/formSteps";
import { toastError, toastFormComplete } from "@/lib/customToast";
import {
  getValidationMessages,
  mergeApplicationSection,
} from "@/lib/forms/formUtils";
import Data_EN from "@/locales/applicant-form/first-form_en.json";
import Data_ES from "@/locales/applicant-form/first-form_es.json";
import type { ApplicationInterface } from "@/types/application";
import type { FirstFormData } from "@/types/locale";

type FirstFormValues = {
  name: string;
  age: string;
  sex: string;
  phone: string;
  languages?: string[];
};

const firstFormSchema = (
  locale: "EN" | "ES",
): z.ZodType<FirstFormValues, FirstFormValues> => {
  const { required, tooLong } = getValidationMessages(locale);

  return z.object({
    name: z
      .string({ error: required })
      .trim()
      .min(1, required)
      .max(50, tooLong),
    age: z.string({ error: required }).trim().min(1, required).max(10, tooLong),
    sex: z.string({ error: required }).trim().min(1, required).max(10, tooLong),
    phone: z
      .string({ error: required })
      .trim()
      .min(1, required)
      .max(25, tooLong),
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
        className="w-full space-y-6"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{localeData.name}</FormLabel>

              <FormControl>
                <Input placeholder="" {...field} />
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
              <FormLabel className="flex justify-center text-center sm:justify-start sm:text-left">
                {localeData.whatsapp}
              </FormLabel>

              <FormControl>
                <Input
                  id="form-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="text-center sm:text-left"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => (
              <FormItem className="min-w-35 flex-1 p-5 sm:min-w-45">
                <FormLabel className="text-center">
                  {localeData.gender}
                </FormLabel>
                <FormControl>
                  <ToggleGroup
                    size="sm"
                    type="single"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="w-full justify-center gap-2"
                  >
                    <ToggleGroupItem
                      value="male"
                      aria-label={localeData.male}
                      className="min-h-11 min-w-11 aria-pressed:border-2 aria-pressed:border-primary focus-visible:ring-2"
                    >
                      <IoMale aria-hidden="true" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="female"
                      aria-label={localeData.female}
                      className="min-h-11 min-w-11 aria-pressed:border-2 aria-pressed:border-primary focus-visible:ring-2"
                    >
                      <IoFemale aria-hidden="true" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="other"
                      aria-label={localeData.otherGender}
                      className="min-h-11 min-w-11 aria-pressed:border-2 aria-pressed:border-primary focus-visible:ring-2"
                    >
                      <IoMaleFemale aria-hidden="true" />
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
              <FormItem className="min-w-35 flex-1 items-center p-5 sm:min-w-45">
                <FormLabel>{localeData.age}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 w-full justify-center">
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
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="languages"
          control={form.control}
          render={({ field }) => (
            <FormItem className="p-5">
              <div className="flex flex-col justify-center gap-1 text-center">
                <FormLabel>{localeData.spoken}</FormLabel>
                <FormDescription className="font-normal italic">
                  {localeData.optional}
                </FormDescription>
              </div>
              <FormControl>
                <ToggleGroup
                  size="sm"
                  type="multiple"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  className="w-full flex-wrap justify-center gap-2"
                >
                  {languages.map((lang) => (
                    <ToggleGroupItem
                      key={lang.label}
                      value={lang.label}
                      className="min-h-10 px-3 focus-visible:ring-2"
                    >
                      {lang.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="min-h-11 w-full rounded-lg px-6 text-base font-semibold sm:px-12"
          size={"lg"}
        >
          {localeData.nextbutton}
        </Button>
      </form>
    </Form>
  );
}
