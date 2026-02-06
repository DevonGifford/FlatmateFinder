import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGlobalState } from "@/hooks/useGlobalState";
import faqData_EN from "@/locales/faq/faq_en.json";
import faqData_ES from "@/locales/faq/faq_es.json";

export default function FAQPage() {
  const { locale } = useGlobalState();
  const localeData = locale === "EN" ? faqData_EN : faqData_ES;

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <h1 className="text-4xl italic py-4 pb-6 border-b-2">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full text-center">
          {localeData.faq_questions.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              className="border-none py-2"
              value={`item-${index}`}
            >
              <AccordionTrigger className="flex-col justify-center gap-1 py-2 text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="mx-8 text-left">
                {faq.answer} {faq.emoji}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
