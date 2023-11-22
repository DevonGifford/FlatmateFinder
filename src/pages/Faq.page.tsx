import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6">
          Frequently Asked Questions
        </div>
        <Accordion type="single" collapsible className="w-full text-center">
          <AccordionItem className=" border-none" value="item-1">
            <AccordionTrigger className="flex-col justify-center gap-1 text-xl">
              When is the room available
            </AccordionTrigger>
            <AccordionContent className="mx-8">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className=" border-none" value="item-2">
            <AccordionTrigger className="flex-col justify-center gap-1 text-xl">
              How close is the nearest gym, shop, metro?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className=" border-none" value="item-3">
            <AccordionTrigger className="flex-col justify-center gap-1 text-xl">
              How many people live in the apartment?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
