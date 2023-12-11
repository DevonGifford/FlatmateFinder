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

  return (
    <>
      <div className="flex flex-col  justify-center items-center h-full overflow-auto hide-scrollbar">
        {/* Handle Selecting Forms */}
        {/* Conditional rendering based on router query */}
        {pageId === "second-form" && <SecondForm key="second-form" />}
        {pageId === "third-form" && <ThirdForm key="third-form" />}

        {/* Render 'go back to previous form' button or render first form */}
        {pageId ? (
          <div>
            <Button
              className="text-xs font-bold translate-y-1/2"
              variant={"outline"}
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
    </>
  );
};

export default ApplicationPage;
