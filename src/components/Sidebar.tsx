import { Link, useNavigate } from "react-router-dom";
import { useGlobalDispatch } from "@/lib/hooks/useGlobalDispatch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();

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
              <SheetDescription>Calle de Muller</SheetDescription>
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
                    dispatch({ type: "RESET_AUTH" });
                    navigate("/");
                    window.location.reload(); //🎯 to-do-list remove
                  }}
                  className="flex text-xl font-semibold w-full h-14 rounded-xl justify-center items-center hover:bg-slate-300"
                >
                  Logout
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
