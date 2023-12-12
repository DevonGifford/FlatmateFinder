import React from "react";
import { Button } from "@/components/ui/button";
import { FirstForm } from "@/components/forms/first-form";
import { SecondForm } from "@/components/forms/second-form";
import { ThirdForm } from "@/components/forms/third-form";
// import { useParams, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useURLState } from "@/lib/hooks/useUrlState";
import { useNavigate } from "react-router-dom";

const ApplicationPage: React.FC = () => {
  const { pageId } = useURLState();
  const navigate = useNavigate();

  console.log("🎈🎈PAGEIDE", pageId);

  const getCircleColor = (circleId: number) => {
    // Logic to determine background color based on pageId and circleId
    // Example logic: Change background color for the completed circle
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
        {/* Handle Eaasy Viewing Forms to complete  */}
        <div className="flex flex-row justify-center items-center text-center gap-6 text-xl font-bold py-6">
          {[1, 2, 3].map((circleId) => (
            <div
              key={circleId}
              className={`h-4 w-4 text-xs flex justify-center items-center rounded-full ${getCircleColor(
                circleId
              )}`}
            >
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:w-3/5 max-w-xl">
          {/* Conditional rendering based on router query */}
          {pageId === "second-form" && <SecondForm key="second-form" />}
          {pageId === "third-form" && <ThirdForm key="third-form" />}
          {/* 🎯{pageId === "complete-form" && INSERT THANK YOU PAGE} */}

          {/* Render 'go back to previous form' button or render first form */}
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
                <ArrowLeftIcon size={16} /> Go Back
              </Button>
            </div>
          ) : (
            <FirstForm key="first-form" /> //👉 change to whatever form for development use
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
