import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import faqData_EN from "../lib/translations/faq-page/faq_en.json";
import faqData_ES from "../lib/translations/faq-page/faq_es.json";
import { useLanguageContext } from "@/components/contexts/language/useLanguageContext";

export default function FaqPage() {
  const { language } = useLanguageContext(); // Access language from the context

  let questionData;
  if (language === "english") {
    questionData = faqData_EN;
  } else {
    questionData = faqData_ES;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6 border-b-2">
          Frequently Asked Questions
        </div>
        <Accordion type="single" collapsible className="w-full text-center">
          {questionData.faq_questions.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              className="border-none py-2"
              value={`item-${index}`}
            >
              <AccordionTrigger className="flex-col justify-center gap-1 py-2 text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="mx-8">
                {faq.answer} {faq.emoji}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
