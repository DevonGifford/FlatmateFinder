import { useGlobalState } from "@/hooks/useGlobalState";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThankyouPageData } from "@/types/localeInterfaces";

import Data_EN from "@/locales/thankyou-page/thankyou_en.json";
import Data_ES from "@/locales/thankyou-page/thankyou_es.json";

export default function ThankyouPage() {
  const { locale } = useGlobalState();
  const localeData: ThankyouPageData = locale === "EN" ? Data_EN : Data_ES;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="/ThankYouPage.png"
          alt="Thank you illustration"
          className="rounded-full -translate-y-10"
          width={"500px"}
        />
        <Link to="/FAQ">
          <h2 className="text-3xl font-bold">{localeData.checkoutHeading}</h2>
          <Button>{localeData.faqheading}</Button>
        </Link>
      </div>
    </>
  );
}
