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
import { ApplicantProfile } from "@/lib/types/applicant-type";
import { useNavigate } from "react-router-dom";
import { useApplicantContext } from "../contexts/applicant/useApplicantContext";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { createApplicantDoc } from "@/lib/firebase/firestore";
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
  photo: z.string().optional(),
});
type ThirdFormValues = z.infer<typeof thirdFormSchema>;

export function ThirdForm() {
  const navigate = useNavigate();
  const { updateApplicantContext, applicantProfile } = useApplicantContext();

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
  async function onSubmit(data: ThirdFormValues) {
    console.log("thirdForm/Submit:  💢 Triggered", data);

    if (applicantProfile) {
      console.log("🦺 Applicant context exist's proceeding with submission");

      // 👇 Create a uuid for the user
      //- Generate a unique ID for the user
      const secretVar = import.meta.env.VITE_SECRET_VARIABLE;
      const nameFirstFive = applicantProfile.firstForm.name
        .slice(0, 5)
        .replace(/\s/g, ""); // Extract first 5 letters and remove spaces
      const currentTimeStamp = Date.now().toString().slice(-5); // Extract last 5 digits of current timestamp
      //-Construct a custom ID combining name, secret variable, and timestamp
      const documentId = `${nameFirstFive}-${secretVar}-${currentTimeStamp}`;
      console.log("🦺 documentId", documentId);


      try {
        // 👇 Merge form data with context data
        const updatedThirdForm = {
          ...applicantProfile.thirdForm,
          ...data,
          photo: "", //🎯💣 Temporary solution for if photo
        };
        console.log("🦺 updatedThirdForm", updatedThirdForm);

        const updatedProfile: ApplicantProfile = {
          ...applicantProfile,
          thirdForm: updatedThirdForm,
          uuid: documentId
        };
        console.log("🦺 updatedProfile", updatedProfile);

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
        toastFormComplete("3");
        navigate("/thankyou"); //-change route
      } catch (error) {
        // ✖ Handle errors
        toastError();
        //📌 db update at end of form flow
      }
    } else {
      console.log("Error:  cannot access applicant context");
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
        <div className="grid w-full items-center gap-2 rounded-lg border p-4">
          <Label htmlFor="picture" className="py-2">
            Picture
          </Label>
          <Input id="picture" type="file" />
        </div>

        {/* BUTTONS */}
        <Button
          type="submit"
          className="rounded-lg text-sm md:text-base lg:text-xl p-4 px-8 md:px-12 md:py-6"
          size={"lg"}
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
