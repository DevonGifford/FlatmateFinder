import { ArrowLeft, HelpCircle, XSquare } from "lucide-react";
import { useMatch, useNavigate } from "react-router-dom";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import homeData_EN from "@/locales/home/home_en.json";
import homeData_ES from "@/locales/home/home_es.json";
import type { HomePageData } from "@/types/locale";

export default function Navbar() {
  const match = useMatch("*"); //- match any route
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { locale } = useGlobalState();
  const localeData: HomePageData = locale === "EN" ? homeData_EN : homeData_ES;

  return (
    <>
      <nav
        className="flex flex-row justify-between"
        aria-label={localeData.navigationLabel}
      >
        {match && match.pathname === "/form" ? (
          <Button
            onClick={() => navigate("/")}
            size={"sm"}
            variant={"ghost"}
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            aria-label={localeData.quitForm}
          >
            <XSquare size={25} aria-hidden="true" />
          </Button>
        ) : match && match.pathname === "/FAQ" ? (
          <Button
            onClick={() => navigate("/")}
            size={"sm"}
            variant={"ghost"}
            className="flex h-10 flex-row gap-2 px-3 transition ease-in-out duration-150 hover:scale-105"
            aria-label={localeData.backButton}
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="text-base">{localeData.backButton}</span>
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/FAQ")}
            size={"lg"}
            variant={"ghost"}
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            aria-label={localeData.faqButton}
          >
            <HelpCircle size={24} aria-hidden="true" />
            <span className="block text-lg">{localeData.faqButton}</span>
          </Button>
        )}

        <div
          className="flex flex-row gap-2"
          role="group"
          aria-label="Language selection"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              dispatch({
                type: "SET_LOCALE",
                payload: "EN",
              })
            }
            aria-pressed={locale === "EN"}
            className={`${
              locale === "EN" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
            } aria-pressed:bg-cyan-600/20 aria-pressed:text-foreground aria-pressed:hover:bg-cyan-600/20`}
            aria-label={localeData.languageEnglish}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/en-flag.webp" alt="" />
            </Avatar>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              dispatch({
                type: "SET_LOCALE",
                payload: "ES",
              })
            }
            aria-pressed={locale === "ES"}
            className={`${
              locale === "ES" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
            } aria-pressed:bg-cyan-600/20 aria-pressed:text-foreground aria-pressed:hover:bg-cyan-600/20`}
            aria-label={localeData.languageSpanish}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/es-flag.webp" alt="" />
            </Avatar>
          </Button>
        </div>
      </nav>
    </>
  );
}
