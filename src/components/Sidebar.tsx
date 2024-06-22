import { Heart, Home, ListChecks, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import tenantData_EN from "@/locales/tenant-pages/tenant_en.json";
import tenantData_ES from "@/locales/tenant-pages/tenant_es.json";
import { TenantPageData } from "@/types/localeInterfaces";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useGlobalDispatch();
  const { locale } = useGlobalState();
  const localeData: TenantPageData =
    locale === "EN" ? tenantData_EN : tenantData_ES;
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const menuItemClass =
    "flex h-14 w-full items-center gap-3 rounded-xl px-5 text-lg font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <nav
      className="flex flex-row justify-between"
      aria-label={localeData.sidebarTitle}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger aria-label={localeData.openMenu}>
          <Menu
            className="transition ease-in-out duration-150 hover:scale-125"
            aria-hidden="true"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="gap-0"
          closeLabel={localeData.closeMenu}
        >
          <SheetHeader className="items-center justify-center border-b py-10">
            <SheetTitle className="text-xl">
              {localeData.sidebarTitle}
            </SheetTitle>
            <SheetDescription>{localeData.sidebarDescription}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-3 p-4 pt-8">
            <Link
              to="/admin-welcome"
              onClick={closeMenu}
              className={menuItemClass}
              aria-current={
                location.pathname === "/admin-welcome" ? "page" : undefined
              }
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              {localeData.dashboard}
            </Link>
            <Link
              to="/admin-tinder"
              onClick={closeMenu}
              className={menuItemClass}
              aria-current={
                location.pathname === "/admin-tinder" ? "page" : undefined
              }
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              {localeData.tinderReview}
            </Link>
            <Link
              to="/admin-leaderboard"
              onClick={closeMenu}
              className={menuItemClass}
              aria-current={
                location.pathname === "/admin-leaderboard" ? "page" : undefined
              }
            >
              <ListChecks className="h-5 w-5" aria-hidden="true" />
              {localeData.leaderboard}
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
                <LogOut className="h-5 w-5" aria-hidden="true" />
                {localeData.logout}
              </Button>
              <p className="mt-4 border-t px-2 pb-6 pt-4 text-center text-sm leading-relaxed text-muted-foreground">
                <strong className="font-semibold">
                  {localeData.tenantSpaceOnly}
                </strong>
                <br />
                {localeData.tenantAccess}
                <br />
                {localeData.applicantAccess}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
