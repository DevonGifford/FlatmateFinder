import { Menu, RefreshCwIcon, SaveAllIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <>
      <nav className="flex flex-row justify-between">
        {/* //👇 Hamburger Menu */}
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Quick Links</SheetTitle>
              <SheetDescription>
                Remember to save your changes before leaving.
              </SheetDescription>
              <Link
                to="/applicant-leaderboard"
                className="flex text-xl font-semibold w-full h-20 rounded-xl justify-center items-center hover:bg-slate-300"
              >
                Leaderboard
              </Link>
              <Link
                to="/applicant-tinder"
                className="flex text-xl font-semibold w-full h-20 rounded-xl justify-center items-center hover:bg-slate-300"
              >
                Tinder
              </Link>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="flex flex-row">
          <Button
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            size={"sm"}
            variant={"ghost"}
          >
            <RefreshCwIcon />
          </Button>
          <Button
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-110"
            size={"sm"}
            variant={"ghost"}
          >
            <SaveAllIcon />
          </Button>
        </div>
      </nav>
    </>
  );
}
