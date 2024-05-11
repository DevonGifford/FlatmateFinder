import { Link } from "react-router-dom";
import { useRequireTenant } from "@/hooks/useRequireTenant";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/hooks/useGlobalState";

export default function TenantWelcomePage() {
  useRequireTenant();
  const { loggedTenant } = useGlobalState();

  return (
    <div className="mx-auto flex max-w-screen-md flex-col items-center justify-center gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col text-center text-lg font-bold">
        <h1 className="text-2xl italic pb-2 border-b-2">TENANT PAGE</h1>
        <h2 className="font-thin pt-4">
          Welcome to your profile {loggedTenant}
        </h2>
      </header>
      <article className="text-lg">
        <h2 className="mb-4 text-3xl">Steps to use the app:</h2>
        <div className="flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-center md:gap-8">
          <section className="flex min-h-[250px] w-full flex-col border-2 p-6 sm:p-8 md:w-1/2">
            <Link to={"/admin-tinder"}>
              <Button>
                <p className="font-semibold">The Tinderpage.</p>
              </Button>
            </Link>
            <p className="italic text-sm py-2 whitespace-nowrap pb-6">
              Rate and review applicants.
            </p>
            <ol className="list-disc text-start mb-4">
              <li>Rate each candidate</li>
              <li>Swipe the card</li>
            </ol>
            <span className="text-sm italic">Left for no - Right for yes.</span>
          </section>

          <section className="flex min-h-[250px] w-full flex-col border-2 p-6 sm:p-8 md:w-1/2">
            <Link to={"/admin-leaderboard"}>
              <Button>
                <p className="font-semibold">The Leaderboard.</p>
              </Button>
            </Link>
            <p className="italic text-sm py-2 whitespace-nowrap pb-6">
              Overview of applicants
            </p>
            <ol className="list-disc text-start mb-4">
              <li>Candidates ranked</li>
              <li>Ranked by star value</li>
            </ol>
            <span className="text-sm italic">Still very rudimentary.</span>
          </section>
        </div>
      </article>
      <footer>
        <p className="font-semibold tracking-wider">
          Lets find our next flatmate
        </p>
        <p>😁</p>
      </footer>
    </div>
  );
}
