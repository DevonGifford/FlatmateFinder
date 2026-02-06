import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/hooks/useGlobalState";
import Data_EN from "@/locales/applicant-thank-you/thank-you_en.json";
import Data_ES from "@/locales/applicant-thank-you/thank-you_es.json";
import type { ThankYouPageData } from "@/types/locale";

export default function ApplicantThankYouPage() {
  const { locale } = useGlobalState();
  const localeData: ThankYouPageData = locale === "EN" ? Data_EN : Data_ES;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="/ThankYouPage.png"
          alt="Thank you illustration"
          className="rounded-full -translate-y-10"
          width={"500px"}
          loading="lazy"
          decoding="async"
        />
        <h2 className="text-3xl font-bold">{localeData.checkoutHeading}</h2>
        <Button render={<Link to="/FAQ" />}>{localeData.faqheading}</Button>
      </div>
    </>
  );
}
