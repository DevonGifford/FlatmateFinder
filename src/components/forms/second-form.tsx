import { zodResolver } from "@hookform/resolvers/zod";
import { User, Video } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGlobalState } from "@/hooks/useGlobalState";
import { lengthOfStayRange } from "@/lib/constants/applicantConstraints";
import { getFormStepPath } from "@/lib/constants/formSteps";
import {
  getValidationMessages,
  mergeApplicationSection,
} from "@/lib/forms/formUtils";
import { toastError, toastFormComplete } from "@/lib/toast";
import { cn } from "@/lib/utils";
import Data_EN from "@/locales/applicant-form/second-form_en.json";
import Data_ES from "@/locales/applicant-form/second-form_es.json";
import type { Application } from "@/types/application";
import type { SecondFormData } from "@/types/locale";

type SecondFormValues = {
  move_date: Date;
  length_stay: number;
  meet_type: string;
  more_info?: string;
};

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

const secondFormSchema = (
  locale: "EN" | "ES",
): z.ZodType<SecondFormValues, SecondFormValues> => {
  const { required, tooLong } = getValidationMessages(locale);

  return z.object({
    move_date: z.date({ error: required }),
    length_stay: z
      .number({ error: required })
      .int()
      .min(lengthOfStayRange.min)
      .max(lengthOfStayRange.max),
    meet_type: z.string({ error: required }).trim().min(1, required),
    more_info: z.string().max(500, tooLong).optional(),
  });
};

interface SecondFormProps {
  application: Application | null;
  setApplication: Dispatch<SetStateAction<Application>>;
}

export function SecondForm({ application, setApplication }: SecondFormProps) {
  const navigate = useNavigate();
  const { locale } = useGlobalState();
  const localeData: SecondFormData = locale === "EN" ? Data_EN : Data_ES;
  const minimumMoveDate = getToday();

  const defaultValues: SecondFormValues = application!.secondForm;
  const form = useForm<SecondFormValues>({
    resolver: zodResolver(secondFormSchema(locale)),
    defaultValues,
  });

  function onSubmit(data: SecondFormValues) {
    try {
      mergeApplicationSection(setApplication, "secondForm", data);

      toastFormComplete(2);
      navigate(getFormStepPath("third-form"));
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
        className="w-full space-y-8"
      >
        <FormField
          name="move_date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex min-w-0 flex-col p-5">
              <div className="flex flex-col justify-center gap-1 text-center">
                <FormLabel>{localeData.headingMoveDate}</FormLabel>
                <FormDescription className="font-normal italic">
                  {localeData.descriptionMoveDate}
                </FormDescription>
              </div>

              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant={"secondary"}
                      className={cn(
                        "h-10 w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    />
                  }
                >
                  <span>
                    {field.value instanceof Date
                      ? field.value.toDateString()
                      : localeData.pickDate}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < minimumMoveDate}
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="length_stay"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-6 p-5">
              <div className="flex flex-col items-center pb-2">
                <FormLabel>{localeData.headingETAStay}</FormLabel>
              </div>

              <FormControl className="mx-auto w-11/12">
                <Slider
                  min={lengthOfStayRange.min}
                  max={lengthOfStayRange.max}
                  step={1}
                  value={[field.value]}
                  onValueChange={(vals) => {
                    field.onChange(Array.isArray(vals) ? vals[0] : vals);
                  }}
                />
              </FormControl>

              <div className="flex justify-between text-sm text-muted-foreground sm:w-11/12">
                <div className="flex flex-col text-center">
                  <p>3</p>
                  <p className="w-full">{localeData.months}</p>
                </div>
                <div className="flex flex-col text-center">
                  <p>6</p>
                  <p className="w-full">{localeData.months}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p>1</p>
                  <p>{localeData.year}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p>+?</p>
                  <p>{localeData.year}s</p>
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="meet_type"
          control={form.control}
          render={({ field }) => (
            <FormItem className="p-5">
              <FormLabel>{localeData.headingTypeViewing}</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  className="w-full flex-row justify-center gap-2 pt-2"
                >
                  <ToggleGroupItem
                    value="inperson"
                    role="button"
                    className="min-h-14 min-w-24 flex-col items-center justify-center gap-1 px-4 py-2 text-center aria-pressed:border-2 aria-pressed:border-primary aria-pressed:shadow-md focus-visible:ring-2"
                  >
                    <User className="font-bold" size={18} aria-hidden="true" />
                    <span className="text-xs">{localeData.inPerson}</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="videocall"
                    role="button"
                    className="min-h-14 min-w-24 flex-col items-center justify-center gap-1 px-4 py-2 text-center aria-pressed:border-2 aria-pressed:border-primary aria-pressed:shadow-md focus-visible:ring-2"
                  >
                    <Video size={18} aria-hidden="true" />
                    <span className="text-xs">{localeData.videoCall}</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <span className="text-sm text-muted-foreground">
                {" "}
                *{localeData.schedule}
              </span>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="more_info"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-center gap-1 text-center">
                <FormLabel>{localeData.headingMoreInfo}</FormLabel>
                <FormDescription className="font-normal italic">
                  {localeData.optional}
                </FormDescription>
              </div>
              <FormControl>
                <Textarea
                  placeholder={`${localeData.specialRequestQuestion}`}
                  {...field}
                />
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
