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
      <div className="flex flex-col items-center h-[calc(100vh-10vh)] overflow-auto hide-scrollbar">
        {/* Handle Viewing Form  */}
        <div className="flex flex-row justify-center items-center text-center gap-3 text-xl font-bold py-10">
          <p>Form one</p>
          <p>Form two</p>
          <p>Form three</p>
        </div>
        {/* Conditional rendering based on router query */}
        {pageId === "second-form" && <SecondForm key="second-form" />}
        {pageId === "third-form" && <ThirdForm key="third-form" />}
        {/* 🎯{pageId === "complete-form" && INSERT THANK YOU PAGE} */}

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
