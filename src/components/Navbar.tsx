import { useMatch, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { HelpCircle, HomeIcon, XSquare } from "lucide-react";
import {
  Language,
  LanguageContext,
} from "./contexts/language/LanguageProvider";

export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const match = useMatch("*"); //- match any route

  // ✅ Handles changing website language
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <nav className="flex flex-row justify-between">
        {/* // 👇 FAQ/HOME/QUIT BUTTON */}
        {match && match.pathname === "/form" ? (
          //👀 Quit Button if URL is "/form"
          <Button
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            size={"sm"}
            variant={"ghost"}
            onClick={() => {
              navigate("/");
            }}
          >
            <XSquare size={25} />
          </Button>
        ) : match && match.pathname === "/FAQ" ? (
          //👀 HOME button if URL is "/FAQ"
          <Button
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            size={"sm"}
            variant={"ghost"}
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon size={22} />
          </Button>
        ) : (
          //👀 Default FAQ Button
          <Button
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              navigate("/FAQ");
            }}
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
            onClick={() => changeLanguage("english")}
            className={`${
              language === "english" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
            }`}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/en-flag.png" />
            </Avatar>
          </ToggleGroupItem>
          <ToggleGroupItem
            variant={"outline"}
            value="ES"
            onClick={() => changeLanguage("spanish")}
            className={`${
              language === "spanish" ? "bg-cyan-600/20" : "hover:bg-cyan-600/20"
            }`}
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
