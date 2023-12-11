"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Building, Home, Video } from "lucide-react";
import { Label } from "../ui/label";

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
    .max(240, {
      message: "⚠ too long",
    }),
  hobbies: z
    .string({
      required_error: "⚠",
    })
    .max(240, {
      message: "⚠ too long",
    }),
  photo: z.string(),
});
type ThirdFormValues = z.infer<typeof thirdFormSchema>;

export function ThirdForm() {
  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<ThirdFormValues>({
    resolver: zodResolver(thirdFormSchema),
  });

  //   💣 COMPLETE THIS
  // - Upload to storage
  // - Create local state to hold url
  // - submit form with state.
  //   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //     const file = e.target.files?.[0]; // Accessing the first file from the selected files

  //     // -uploade to firestore

  //     // -return the url string
  //     const storageLink = "";

  //     if (file) {
  //       form.setValue("photo", storageLink);
  //     }
  //   }

  // ✅ SUBMIT FORM - submit account form
  function onSubmit(data: ThirdFormValues) {
    console.log(
      "🎯event-log:  📝UserForm/ThirdForm/onSubmit:  💢 Triggered",
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
        className="space-y-6 w-full -translate-y-5 "
      >
        {/* JOB */}
        <div className="flex flex-col rounded-lg border w-[300px]">
          {/* JOB TITLE */}
          <FormField
            name="job_title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="border-none">
                <FormLabel className="flex text-center justify-center">
                  Career Title
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
                      <span className="text-xs">WFH</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="hybrid"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Video />
                      <span className="text-xs">Hybrid</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="office"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Building />
                      <span className="text-xs">Office</span>
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
              <FormLabel>Tell us more about you</FormLabel>
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
              <FormLabel>What do you do for fun</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 💣 upload image */}
        <div className="grid w-full max-w-sm items-center gap-1.5 rounded-lg border p-4">
          <Label htmlFor="picture" className="py-2">Picture</Label>
          <Input id="picture" type="file" />
        </div>

        {/* BUTTONS */}
        <Button
          type="submit"
          className="rounded-lg text-sm md:text-base p-2 px-4"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
