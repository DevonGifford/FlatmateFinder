import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Heart,
  Home,
  ListChecks,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const menuItemClass =
    "flex h-14 w-full items-center gap-3 rounded-xl px-5 text-lg font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <nav className="flex flex-row justify-between">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger aria-label="Open tenant menu">
          <Menu className="transition ease-in-out duration-150 hover:scale-125" />
        </SheetTrigger>
        <SheetContent side="left" className="gap-0">
          <SheetHeader className="items-center justify-center border-b py-10">
            <SheetTitle className="text-xl">Tenant menu</SheetTitle>
            <SheetDescription>Navigate your dashboard</SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-3 p-4 pt-8">
            <Link to="/admin-welcome" onClick={closeMenu} className={menuItemClass}>
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/admin-tinder" onClick={closeMenu} className={menuItemClass}>
              <Heart className="h-5 w-5" />
              Tinder Review
            </Link>
            <Link
              to="/admin-leaderboard"
              onClick={closeMenu}
              className={menuItemClass}
            >
              <ListChecks className="h-5 w-5" />
              Leaderboard
            </Link>
            <div className="mt-auto border-t pt-5">
              <Button
                variant="destructive"
                onClick={() => {
                  dispatch({ type: "RESET_AUTH" });
                  closeMenu();
                  navigate("/");
                }}
                className="h-14 w-full justify-start gap-3 rounded-xl px-5 text-lg font-semibold"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
              <p className="mt-4 border-t px-2 pb-6 pt-4 text-center text-sm leading-relaxed text-muted-foreground">
                <strong className="font-semibold">Tenant space only</strong>
                <br />
                Only current tenants can log in to review applicants and view
                the leaderboard.
                <br />
                Applicants can’t access these pages.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
