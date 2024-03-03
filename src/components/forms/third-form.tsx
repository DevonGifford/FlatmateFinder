import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/Spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Building, Home, Link, Video } from "lucide-react";
import { ApplicationInterface, defaultApplication } from "@/lib/interfaces/applicationInterfaces";
import { createApplicantDoc } from "@/lib/firebase/firestore";
import { toastError, toastFormComplete } from "@/lib/customToast";
import { ThirdFormData } from "@/lib/interfaces/localeInterfaces";

import Data_EN from "@/lib/translations/applicant-form/thirdform_en.json";
import Data_ES from "@/lib/translations/applicant-form/thirdform_es.json";

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
  social_media: z
    .string()
    .max(30, {
      message: "⚠ too long",
    })
    .optional(),
});
type ThirdFormValues = z.infer<typeof thirdFormSchema>;

interface ThirdFormProps {
  application: ApplicationInterface | null;
  setApplication: React.Dispatch<React.SetStateAction<ApplicationInterface>>;
}

export function ThirdForm({ application, setApplication }: ThirdFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useGlobalState();
  const localeData: ThirdFormData = locale === "EN" ? Data_EN : Data_ES;

  const form = useForm<ThirdFormValues>({
    resolver: zodResolver(thirdFormSchema),
  });

  async function onSubmit(data: ThirdFormValues) {
    try {
      setIsLoading(true);
      if (!application) {
        throw new Error("Error: cannot access applicant context");
      }

      // - Generate a unique ID for the user
      const nameFirstFive = application.firstForm.name.slice(0, 5).replace(/\s/g, ""); // Extract first 5 letters and remove spaces
      const currentTimeStamp = Date.now().toString().slice(-5); // Extract last 5 digits of current timestamp
      const documentId = `${nameFirstFive}-${currentTimeStamp}`;

      const updatedThirdForm = {
        ...application.thirdForm,
        ...data,
        social_media: data.social_media || "",  //normalize data
        job_type: data.job_type || "",          //normalize data
      };

      const completedApplication: ApplicationInterface = {
        ...application,
        thirdForm: updatedThirdForm,
        uuid: documentId,
        photo: "",
      };
      await createApplicantDoc(documentId, completedApplication);

      setIsLoading(false);
      toastFormComplete("3");
      setApplication(defaultApplication); // Reset application state
      navigate("/thankyou");              // Update route
    } catch (error) {
      setIsLoading(false);
      toastError();
      console.error("Error in submitting data", error);
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
        <div className="flex flex-col rounded-lg border">
          <FormField
            name="job_title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="border-none pb-0 min-w-[300px]">
                <FormLabel className="flex text-center justify-center">
                  {localeData
              .careerTitle}
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
                      <span className="text-xs">{localeData
                  .wfh}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="hybrid"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Video />
                      <span className="text-xs">{localeData
                  .hybrid}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="office"
                      className="flex flex-col items-center justify-center text-center gap-1"
                    >
                      <Building />
                      <span className="text-xs">{localeData
                  .office}</span>
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
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {localeData
            .tellMoreTitle}
                <p className="text-xs font-thin italic">
                  {localeData
              .tellMoreDescription}
                </p>
              </FormLabel>
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
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                {localeData
            .hobbiesTitle}
                <p className="text-xs font-thin italic">
                  {localeData
              .hobbiesPlacholder}
                </p>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="social_media"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
              <FormLabel className="flex flex-col gap-1 text-center justify-center">
                <p>{localeData
            .social}</p>
                <p className="text-xs font-thin italic">
                  {localeData
              .optional}
                </p>
              </FormLabel>
              <div className="flex flex-row justify-between items-center gap-3">
                <Link className="text-devready-green" size={20} />
                <FormControl>
                  <Input placeholder="Instagram, LinkedIn etc." {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-lg text-sm md:text-base lg:text-xl p-4 px-8 md:px-16 md:py-6"
          size={"lg"}
        >
          {isLoading ? <Spinner /> : `${localeData
        .completeButton}`}
        </Button>
      </form>
    </Form>
  );
}
