import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { useGlobalState } from "@/hooks/useGlobalState";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { User, Video } from "lucide-react";
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

import { SecondFormData } from "@/types/localeInterfaces";
import { ApplicationInterface } from "@/types/applicationInterfaces";

import Data_EN from "@/locales/applicant-form/secondform_en.json";
import Data_ES from "@/locales/applicant-form/secondform_es.json";

type SecondFormValues = {
  move_date: Date;
  length_stay: number;
  meet_type: string;
  more_info?: string;
};

const secondFormSchema = (
  locale: "EN" | "ES"
): z.ZodType<SecondFormValues, SecondFormValues> => {
  const requiredMessage =
    locale === "EN" ? "Please complete this field." : "Completa este campo.";
  const tooLongMessage =
    locale === "EN"
      ? "Please use fewer characters."
      : "Usa menos caracteres.";

  return z.object({
    move_date: z.date({ error: requiredMessage }),
    length_stay: z.number({ error: requiredMessage }),
    meet_type: z.string({ error: requiredMessage }).trim().min(1, requiredMessage),
    more_info: z.string().max(500, tooLongMessage).optional(),
  });
};

interface SecondFormProps {
  application: ApplicationInterface | null;
  setApplication: Dispatch<SetStateAction<ApplicationInterface>>;
}

export function SecondForm({ application, setApplication }: SecondFormProps) {
  const navigate = useNavigate();
  const { locale } = useGlobalState();
  const localeData: SecondFormData = locale === "EN" ? Data_EN : Data_ES;

  const defaultValues: SecondFormValues = application!.secondForm;
  const form = useForm<SecondFormValues>({
    resolver: zodResolver(secondFormSchema(locale)),
    defaultValues,
  });

  function onSubmit(data: SecondFormValues) {
    try {
      const formData: Partial<ApplicationInterface> = {
        secondForm: {
          ...data,
        },
      };

      setApplication((existingData) => {
        return {
          ...existingData,
          ...formData,
        };
      });

      toastFormComplete("2");
      navigate(`/form?pageId=third-form`); //-updating route
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
        className="space-y-6 w-full "
      >
        {/* SET MOVE DATE */}
        <FormField
          name="move_date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col min-w-[300px]">
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {localeData.headingMoveDate}
                <p className="text-xs font-thin italic">
                  {localeData.descriptionMoveDate}
                </p>
              </FormLabel>

              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"secondary"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    />
                  }
                >
                  <span>
                    {field.value instanceof Date ? field.value.toDateString() : localeData.pickDate}
                  </span>
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
                <FormLabel>{localeData.headingETAStay}</FormLabel>
              </div>

              <FormControl className="mx-4 w-11/12">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={[0]}
                  onValueChange={(vals) => {
                    onChange(Array.isArray(vals) ? vals[0] : vals);
                  }}
                />
              </FormControl>

              <div className="flex justify-between text-xs text-muted-foreground sm:w-11/12">
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

        {/* TYPE OF VIEWING */}
        <FormField
          name="meet_type"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
              <FormLabel>{localeData.headingTypeViewing}</FormLabel>
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
                    <span className="text-xs">{localeData.inPerson}</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="videocall"
                    className="flex flex-col items-center justify-center text-center gap-1"
                  >
                    <Video size={18} />
                    <span className="text-xs">{localeData.videoCall}</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <span className="text-xs text-slate-500">
                {" "}
                *{localeData.schedule}
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
                <p>{localeData.headingMoreInfo}</p>
                <p className="text-xs font-thin italic">
                  {localeData.optional}
                </p>
              </FormLabel>
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

        {/* BUTTONS */}
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
