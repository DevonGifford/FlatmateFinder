import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { HelpCircle } from "lucide-react";

export default function Navbar() {
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
          <ToggleGroupItem value="EN">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/src/assets/en-flag.png" />
            </Avatar>
          </ToggleGroupItem>
          <ToggleGroupItem value="ES">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/src/assets/es-flag.png" />
            </Avatar>
          </ToggleGroupItem>
        </ToggleGroup>
      </nav>
    </>
  );
}
