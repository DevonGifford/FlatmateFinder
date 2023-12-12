import { useContext } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { HelpCircle } from "lucide-react";
import { Language, LanguageContext } from "./contexts/language/LanguageProvider";


export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  console.log('language - 🎈🎈', language)

  return (
    <>
      <nav className="flex flex-row justify-between">
        {/* FAQ BUTTON */}
        <div>
          <a
            href="/"
            // 🎯🔮 FAQ update this link once page is created
            // 🎯🔮 FAQ should be hidden while on form page...(not the whole nav - just this ...)
          >
            <Button
              className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
              size={"sm"}
              variant={"ghost"}
            >
              <HelpCircle size={16} />
              <span className="block">FAQ</span>
            </Button>
          </a>
        </div>
        {/* LANGUAGE SETTINGS */}
        <ToggleGroup type="single">
        <ToggleGroupItem value="EN" onClick={() => changeLanguage('english')}>
          <Avatar className="h-6 w-6">
            <AvatarImage src="/src/assets/en-flag.png" />
          </Avatar>
        </ToggleGroupItem>
        <ToggleGroupItem value="ES" onClick={() => changeLanguage('spanish')}>
          <Avatar className="h-6 w-6">
            <AvatarImage src="/src/assets/es-flag.png" />
          </Avatar>
        </ToggleGroupItem>
      </ToggleGroup>
      </nav>
    </>
  );
}
