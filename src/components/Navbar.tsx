import { useMatch, useNavigate } from "react-router-dom";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowLeft, HelpCircle, XSquare } from "lucide-react";

export default function Navbar() {
  const match = useMatch("*"); //- match any route
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { locale } = useGlobalState();

  return (
    <>
      <nav className="flex flex-row justify-between">
        {/* // 👇 DYNAMIC BUTTON */}
        {match && match.pathname === "/form" ? (
          //👉 Quit Button if URL is "/form"
          <Button
            onClick={() => navigate("/")}
            size={"sm"}
            variant={"ghost"}
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            aria-label="quit-form"
          >
            <XSquare size={25} />
          </Button>
        ) : match && match.pathname === "/FAQ" ? (
          //👉 BACK button if URL is "/FAQ"
          <Button
            onClick={() => navigate("/")}
            size={"sm"}
            variant={"ghost"}
            className="flex h-10 flex-row gap-2 px-3 transition ease-in-out duration-150 hover:scale-105"
            aria-label="back-home"
          >
            <ArrowLeft size={20} />
            <span className="text-base">Back</span>
          </Button>
        ) : (
          //👉 Default FAQ Button
          <Button
            onClick={() => navigate("/FAQ")}
            size={"lg"}
            variant={"ghost"}
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            aria-label="faq-button"
          >
            <HelpCircle size={24} />
            <span className="block text-lg">FAQ</span>
          </Button>
        )}

        {/* //👇 LANGUAGE SETTINGS */}
        <ToggleGroup type="single" value={locale}>
          <ToggleGroupItem
            variant={"outline"}
            value="EN"
            onClick={() =>
              dispatch({
                type: "SET_LOCALE",
                payload: "EN",
              })
            }
            className={`${locale === "EN" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
              } aria-pressed:bg-cyan-600/20 aria-pressed:text-foreground aria-pressed:hover:bg-cyan-600/20`}
            aria-label="locale-en"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/en-flag.png" />
            </Avatar>
          </ToggleGroupItem>
          <ToggleGroupItem
            variant={"outline"}
            value="ES"
            onClick={() =>
              dispatch({
                type: "SET_LOCALE",
                payload: "ES",
              })
            }
            className={`${locale === "ES" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
              } aria-pressed:bg-cyan-600/20 aria-pressed:text-foreground aria-pressed:hover:bg-cyan-600/20`}
            aria-label="locale-es"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/es-flag.png" />
            </Avatar>
          </ToggleGroupItem>
        </ToggleGroup>
      </nav>
    </>
  );
}
