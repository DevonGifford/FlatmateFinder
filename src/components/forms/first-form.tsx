"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Link } from "lucide-react";
import { IoMale } from "react-icons/io5";
import { IoFemale } from "react-icons/io5";
import { IoMaleFemale } from "react-icons/io5";

import { languages } from "@/lib/constants";

// 👇 FORM SCHEMA : Account Form
const firstFormSchema = z.object({
  name: z.string({
    required_error: "⚠",
  }),
  age: z.string({
    required_error: "⚠",
  }),
  sex: z.string({
    required_error: "⚠",
  }),
  phone: z.string({
    required_error: "⚠",
  }),
  social_media: z.string().url().optional(),
  languages: z.array(z.string()).optional(),
});
type FirstFormValues = z.infer<typeof firstFormSchema>;

export function FirstForm() {
  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<FirstFormValues>({
    resolver: zodResolver(firstFormSchema),
  });

  // ✅ SET FORM VALUES - based on existing user profile context data
  // useEffect(() => {
  //   if (userProfile) {
  //     form.setValue("username", userProfile.account.username || "");
  //     form.setValue("career_title", userProfile.account.career_title || "");
  //     form.setValue(
  //       "programming_lang",
  //       userProfile.account.programming_lang || ""
  //     );
  //     form.setValue("career_level", userProfile.account.career_level || 1);
  //     form.setValue(
  //       "experience_level",
  //       userProfile.account.experience_level || 1
  //     );
  //     // - handle skills_lists + local state
  //     if (userProfile && userProfile.account.skills_list) {
  //       setSelectedSkills(userProfile.account.skills_list || []);
  //       form.setValue("skills_list", userProfile.account.skills_list || []);
  //     }
  //   }
  // }, [form, userProfile]);

  // // ✅ HANDLE SKILL SELECTION - checks if skill exists in state, and handles click accordingly
  // const handleSkillList = (selectedSkill: string) => {
  //   const updatedSkills = selectedSkills.includes(selectedSkill)
  //     ? selectedSkills.filter((skill) => skill !== selectedSkill)
  //     : [...selectedSkills, selectedSkill];
  //   //- update local skills state + skills form field
  //   setSelectedSkills(updatedSkills);
  //   form.setValue("languages", updatedSkills);
  // };

  // ✅ SUBMIT FORM - submit account form
  function onSubmit(data: FirstFormValues) {
    console.log(
      "🎯event-log:  📝UserForm/firstform/onSubmit:  💢 Triggered",
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
        className="space-y-4 w-full  "
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex text-center justify-center sm:justify-start">
                Name
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
                  placeholder="(+34)"
                  className="text-center sm:text-left"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GENDER + AGE */}
        <div className="flex flex-row justify justify-between">
          {/* Gender Selection */}
          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rounded-lg border p-4">
                <FormLabel>Gender</FormLabel>
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
                <FormLabel>Age</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="age" />
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

        <FormField
          name="social_media"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
              <FormLabel>Social media</FormLabel>
              <div className="flex flex-row justify-between items-center gap-3">
                <Link className="text-devready-green" size={20} />
                <FormControl>
                  <Input placeholder="Instagram or LinkedIn etc." {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="languages"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
              <FormLabel>I speak</FormLabel>
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
