import { ArrowLeftToLine } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FirstForm } from "@/components/forms/first-form";
import { SecondForm } from "@/components/forms/second-form";
import { ThirdForm } from "@/components/forms/third-form";
import { Button } from "@/components/ui/button";
import { useRequireApplicant } from "@/hooks/useRequireApplicant";
import { useUrlState } from "@/hooks/useUrlState";
import {
  FormStep,
  formSteps,
  getFormStepPath,
} from "@/lib/constants/formSteps";
import {
  ApplicationInterface,
  defaultApplication,
} from "@/types/application";

const ApplicantFormPage: React.FC = () => {
  const [application, setApplication] =
    useState<ApplicationInterface>(defaultApplication);
  const { pageId } = useUrlState();
  const navigate = useNavigate();
  useRequireApplicant();
  const currentStep: FormStep = formSteps.some(({ id }) => id === pageId)
    ? (pageId as FormStep)
    : "first-form";
  const currentStepIndex = formSteps.findIndex(({ id }) => id === currentStep);

  const getPageIndicatorStyle = (circleId: number) => {
    if (circleId - 1 < currentStepIndex) {
      return "border border-cyan-700 bg-cyan-600/60";
    }
    if (circleId - 1 === currentStepIndex) {
      return "border-2 border-cyan-700 bg-cyan-600 ring-4 ring-cyan-600/20";
    }
    return "border border-cyan-600/30 bg-cyan-600/10";
  };

  return (
    <>
      <div className="flex flex-col items-center h-[calc(100vh-10vh)] overflow-auto hide-scrollbar px-2 sm:px-4">
        {/* Page Indicator  */}
        <div className="flex flex-row justify-center items-center text-center gap-8 py-7">
          {[1, 2, 3].map((circleId) => (
            <div
              key={circleId}
              className={`h-5 w-5 rounded-full transition-colors ${getPageIndicatorStyle(
                circleId,
              )}`}
            ></div>
          ))}
        </div>

        <div className="flex w-full max-w-2xl flex-col">
          {/* Conditional rendering based on router query */}
          {currentStep === "second-form" && (
            <SecondForm
              key="second-form"
              application={application}
              setApplication={setApplication}
            />
          )}
          {currentStep === "third-form" && (
            <ThirdForm
              key="third-form"
              application={application}
              setApplication={setApplication}
            />
          )}

          {/* 'go back to previous form' button or render first form */}
          {currentStep !== "first-form" ? (
            <div>
              <Button
                className="mt-6 min-h-10 min-w-10 rounded-lg text-sm font-semibold"
                variant={"secondary"}
                size={"sm"}
                onClick={() => {
                  navigate(getFormStepPath(formSteps[currentStepIndex - 1].id));
                }}
              >
                <ArrowLeftToLine />
              </Button>
            </div>
          ) : (
            <FirstForm
              key="first-form"
              application={application}
              setApplication={setApplication}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicantFormPage;
