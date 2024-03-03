import { useMatch, useNavigate } from "react-router-dom";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { useGlobalDispatch } from "@/lib/hooks/useGlobalDispatch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HelpCircle, HomeIcon, XSquare } from "lucide-react";

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
          //👉 HOME button if URL is "/FAQ"
          <Button
            onClick={() => navigate("/")}
            size={"sm"}
            variant={"ghost"}
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            aria-label="back-home"
          >
            <HomeIcon size={22} />
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
        <ToggleGroup type="single">
          <ToggleGroupItem
            variant={"outline"}
            value="EN"
            onClick={() =>
              dispatch({
                type: "SET_LOCALE",
                payload: "EN",
              })
            }
            className={`${
              locale === "EN" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
            }`}
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
            className={`${
              locale === "ES" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
            }`}
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
