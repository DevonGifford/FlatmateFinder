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

  // 🎯🔮 Need to use this language state - current issue #12
  // 🔗🔮 https://github.com/DevonGifford/FlatmateFinder/issues/12
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // 🔧🚧 Development logs
  console.log("🦺📌 Navbar - current Lang =", language);
  console.log("🦺📌 Navbar - current URL =", match?.pathname);

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
            size={"sm"}
            variant={"ghost"}
            onClick={() => {
              navigate("/FAQ");
            }}
          >
            <HelpCircle size={16} />
            <span className="block">FAQ</span>
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
