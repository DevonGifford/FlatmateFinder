import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useURLState } from "@/lib/hooks/useUrlState";
import { useRequireApplicant } from "@/lib/hooks/useRequireApplicant";
import { Button } from "@/components/ui/button";
import { FirstForm } from "@/components/forms/first-form";
import { ThirdForm } from "@/components/forms/third-form";
import { SecondForm } from "@/components/forms/second-form";
import { ArrowLeftToLine } from "lucide-react";
import { ApplicationInterface, defaultApplication } from "@/lib/interfaces/applicationInterfaces";

const ApplicationPage: React.FC = () => {
  const [application, setApplication] = useState<ApplicationInterface>(defaultApplication);
  const { pageId } = useURLState();
  const navigate = useNavigate();
  useRequireApplicant();

  const getPageIndicatorStyle = (circleId: number) => {
    if (pageId === "second-form" && circleId === 1) {
      return "bg-cyan-600/40";
    } else if (pageId === "third-form" && circleId <= 2) {
      return "bg-cyan-600/40";
    }
    return "bg-cyan-600/10"; // Default color for incomplete circles
  };

  return (
    <>
      <div className="flex flex-col items-center h-[calc(100vh-10vh)] overflow-auto hide-scrollbar">
        {/* Page Indicator  */}
        <div className="flex flex-row justify-center items-center text-center gap-6 text-xl font-bold py-6">
          {[1, 2, 3].map((circleId) => (
            <div
              key={circleId}
              className={`h-4 w-4 text-xs flex justify-center items-center rounded-full ${getPageIndicatorStyle(
                circleId
              )}`}
            ></div>
          ))}
        </div>

        <div className="flex flex-col sm:w-3/5 max-w-xl">
          {/* Conditional rendering based on router query */}
          {pageId === "second-form" && (
            <SecondForm
              key="second-form"
              application={application}
              setApplication={setApplication}
            />
          )}
          {pageId === "third-form" && (
            <ThirdForm
              key="third-form"
              application={application}
              setApplication={setApplication}
            />
          )}

          {/* 'go back to previous form' button or render first form */}
          {pageId ? (
            <div>
              <Button
                className="text-xs font-bold mt-5"
                variant={"secondary"}
                size={"sm"}
                onClick={() => {
                  navigate(-1);
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

export default ApplicationPage;
