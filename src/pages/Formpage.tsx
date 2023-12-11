import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { FirstForm } from "@/components/forms/first-form";
import { SecondForm } from "@/components/forms/second-form";
import { ThirdForm } from "@/components/forms/third-form";

interface FormObject {
  component: React.ReactNode;
  description: string;
}

const userProfileForms: Record<string, FormObject> = {
  1: {
    component: <FirstForm />,
    description: "Basic details",
  },
  2: {
    component: <SecondForm />,
    description: "About your stay.",
  },
  3: {
    component: <ThirdForm />,
    description: "About you.",
  },
};

const FormPage = () => {
  const [currentForm, setCurrentForm] = useState("1");

  return (
    <>
      <div className="flex flex-col  justify-center items-center h-full overflow-auto hide-scrollbar">
        {/* Handle Selecting Forms */}
        <div className="h-full overflow-y-auto flex pl-5 flex-row px-4 py-6">
          <aside className="flex space-x-2 flex-row items-center justify-normal overflow-x-aut scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            {Object.keys(userProfileForms).map((key) => (
              <Button
                key={key}
                onClick={() => setCurrentForm(key)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-primary max-w-[120px] no-underline",
                  currentForm === key
                    ? "bg-muted hover:bg-muted text-devready-green"
                    : "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
                {key}
              </Button>
            ))}
          </aside>
        </div>
        {/* Handle The Different Forms */}
        <div className="space-y-6 pt-5 px-4">
          {userProfileForms[currentForm] && (
            <>
              {/* <div className="flex flex-row text-xl gap-3 font-semibold">
                <h3 className="">{currentForm}. </h3>
                <p className="">{userProfileForms[currentForm].description}</p>
              </div> */}
              {userProfileForms[currentForm].component}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FormPage;
