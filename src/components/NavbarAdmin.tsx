import { Menu, RefreshCwIcon, SaveAllIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useDataContext } from "@/components/contexts/data/useDataContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NavbarAdmin() {
  const navigate = useNavigate();
  const { signOut } = useAdminContext();
  const { handleRefresh } = useDataContext();

  return (
    <>
      <nav className="flex flex-row justify-between ">
        {/* //👇 Hamburger Menu */}
        <Sheet>
          <SheetTrigger>
            <Menu className="transition ease-in-out duration-150 hover:scale-125" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader className=" items-center justify-center py-16">
              <SheetTitle>Quick Links</SheetTitle>
              <SheetDescription>
                Remember to save your changes before leaving.
              </SheetDescription>
              <div className="flex flex-col w-full gap-8 py-4">
                <Link
                  to="/admin-tinder"
                  className="flex text-xl font-semibold w-full h-20 rounded-xl justify-center items-center hover:bg-slate-300"
                >
                  Tinder
                </Link>
                <Link
                  to="/admin-leaderboard"
                  className="flex text-xl font-semibold w-full h-20 rounded-xl justify-center items-center hover:bg-slate-300"
                >
                  Leaderboard
                </Link>
                <Link
                  to="/admin-welcome"
                  className="flex text-xl font-semibold w-full h-20 rounded-xl justify-center items-center hover:bg-slate-300"
                >
                  Instructions
                </Link>
                <Button
                  onClick={() => {
                    signOut();
                    navigate("/");
                    window.location.reload();
                  }}
                  className="flex text-xl font-semibold w-full h-14 rounded-xl justify-center items-center hover:bg-slate-300"
                >
                  Logout
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {/* //👇 Buttons */}
        <div className="hidden flex-row">
          <Button
            className="transition ease-in-out duration-150 hover:scale-125"
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              handleRefresh();
              //🎯 to-do-list: toast notification?
            }}
          >
            <RefreshCwIcon />
          </Button>
          <Button
            className="flex flex-row gap-1 transition ease-in-out duration-150 hover:scale-125"
            size={"icon"}
            variant={"ghost"}
          >
            <SaveAllIcon />
          </Button>
        </div>
      </nav>
    </>
  );
}
