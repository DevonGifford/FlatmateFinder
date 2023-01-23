"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "../../contexts/language/useLanguageContext";
import { useApplicantContext } from "../../contexts/applicant/useApplicantContext";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CalendarIcon, User, Video } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SecondFormData } from "@/lib/types/translation-types";
import { ApplicantProfile } from "@/lib/types/applicant-type";

import Data_EN from "@/lib/translations/applicant-form/secondform_en.json";
import Data_ES from "@/lib/translations/applicant-form/secondform_es.json";

const secondFormSchema = z.object({
  move_date: z.date({
    required_error: "⚠",
    invalid_type_error: "⚠",
  }),
  length_stay: z.number({
    required_error: "⚠",
  }),
  meet_type: z.string({
    required_error: "⚠",
  }),
  more_info: z
    .string()
    .max(500, {
      message: "⚠ too long",
    })
    .optional(),
});
type SecondFormValues = z.infer<typeof secondFormSchema>;

export function SecondForm() {
  const navigate = useNavigate();
  const { updateApplicantContext, applicantProfile } = useApplicantContext();
  const { language } = useLanguageContext();

  const setLanguage: SecondFormData =
    language === "english" ? Data_EN : Data_ES;

  const defaultValues: SecondFormValues = applicantProfile?.secondForm || {
    move_date: new Date(),
    length_stay: 0,
    meet_type: "",
    more_info: "",
  };
  const form = useForm<SecondFormValues>({
    resolver: zodResolver(secondFormSchema),
    defaultValues,
  });

  function onSubmit(data: SecondFormValues) {
    try {
      const formData: Partial<ApplicantProfile> = {
        secondForm: {
          ...data,
          more_info: data.more_info || "",
        },
      };
      updateApplicantContext(formData);
      toastFormComplete("2");
      navigate(`/form?pageId=third-form`); //-updating route
    } catch (error) {
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
        {/* SET MOVE DATE */}
        <FormField
          name="move_date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col min-w-[300px]">
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {setLanguage.headingMoveDate}
                <p className="text-xs font-thin italic">
                  {setLanguage.descriptionMoveDate}
                </p>
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span>
                        {field.value instanceof Date ? (
                          <span>{field.value.toDateString()}</span>
                        ) : (
                          <span>{setLanguage.pickDate}</span>
                        )}
                      </span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("2024-01-20") ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* LENGTH OF STAY */}
        <FormField
          name="length_stay"
          control={form.control}
          render={({ field: { onChange } }) => (
            <FormItem className="space-y-5">
              <div className="flex flex-col items-center pb-2">
                <FormLabel>{setLanguage.headingETAStay}</FormLabel>
              </div>

              <FormControl className="mx-4 w-11/12">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={[0]}
                  onValueChange={(vals) => {
                    onChange(vals[0]);
                  }}
                />
              </FormControl>

              <div className="flex justify-between text-xs text-muted-foreground sm:w-11/12">
                <div className="flex flex-col text-center">
                  <p>3</p>
                  <p className="w-full">{setLanguage.months}</p>
                </div>
                <div className="flex flex-col text-center">
                  <p>6</p>
                  <p className="w-full">{setLanguage.months}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p>1</p>
                  <p>{setLanguage.year}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p>+?</p>
                  <p>{setLanguage.year}s</p>
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* TYPE OF VIEWING */}
        <FormField
          name="meet_type"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
              <FormLabel>{setLanguage.headingTypeViewing}</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  className="pt-2 flex flex-row justify-evenly"
                >
                  <ToggleGroupItem
                    value="inperson"
                    className="flex flex-col items-center justify-center text-center gap-1"
                  >
                    <User className="font-bold" size={18} />
                    <span className="text-xs">{setLanguage.inPerson}</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="videocall"
                    className="flex flex-col items-center justify-center text-center gap-1"
                  >
                    <Video size={18} />
                    <span className="text-xs">{setLanguage.videoCall}</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <span className="text-xs text-slate-500">
                {" "}
                *{setLanguage.schedule}
              </span>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MORE_INFO */}
        <FormField
          name="more_info"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                <p>{setLanguage.headingMoreInfo}</p>
                <p className="text-xs font-thin italic">
                  {setLanguage.optional}
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`${setLanguage.specialRequestQuestion}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
