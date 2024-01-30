import { useLanguageContext } from "@/contexts/language/useLanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThankyouPageData } from "@/lib/types/translation-types";

import Data_EN from "@/lib/translations/thankyou-page/thankyou_en.json";
import Data_ES from "@/lib/translations/thankyou-page/thankyou_es.json";

export default function ThankyouPage() {
  const { language } = useLanguageContext();
  const localeData: ThankyouPageData =
    language === "english" ? Data_EN : Data_ES;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="/ThankYouPage.png"
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
