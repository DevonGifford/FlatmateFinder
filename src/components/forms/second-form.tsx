"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CalendarIcon, User, Video } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

// 👇 FORM SCHEMA : Account Form
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
    .max(240, {
      message: "⚠",
    })
    .optional(),
});
type SecondFormValues = z.infer<typeof secondFormSchema>;

export function SecondForm() {
  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<SecondFormValues>({
    resolver: zodResolver(secondFormSchema),
  });

  // ✅ SUBMIT FORM - submit account form
  function onSubmit(data: SecondFormValues) {
    console.log(
      "🎯event-log:  📝UserForm/SecondForm/onSubmit:  💢 Triggered",
      data
    );

    // 💣 COMPLETE
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(
            "🎯event_log:  📝-form submitted with following form-data: ",
            data
          );
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
              <FormLabel>Move in date</FormLabel>

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
                          <span>Pick a date</span>
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
                      date < new Date() || date < new Date("1900-01-01")
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
                <FormLabel>Estimated length of stay</FormLabel>
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
                  <p className="w-full">Months</p>
                </div>
                <div className="flex flex-col text-center">
                  <p>6</p>
                  <p className="w-full">Months</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p>1</p>
                  <p>Year</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p>++</p>
                  <p>Years</p>
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
              <FormLabel>Type of viewing</FormLabel>
              <FormControl>
                <ToggleGroup
                  size="sm"
                  type="single"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  className="pt-2 flex flex-row justify-evenly"
                >
                  <ToggleGroupItem
                    value="inperson"
                    className="flex flex-col items-center justify-center text-center gap-1"
                  >
                    <User className="font-bold" />{" "}
                    <span className="text-xs">In Person</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="videocall"
                    className="flex flex-col items-center justify-center text-center gap-1"
                  >
                    <Video />
                    <span className="text-xs">Videocall</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <span className="text-xs text-slate-500">
                {" "}
                *scheduled via whatsapp
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
              <FormLabel>More information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I have a special request or question ..." 
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
          className="rounded-lg text-sm md:text-base p-2 px-4"
        >
          Next
        </Button>
        {/* </div> */}
      </form>
    </Form>
  );
}
