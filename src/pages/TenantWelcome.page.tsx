import { Link } from "react-router-dom";
import { useAdminContext } from "@/contexts/admin/useAdminContext";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import { Button } from "@/components/ui/button";

export default function TenantWelcomePage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-screen-md gap-8 py-8">
      <header className="flex flex-col text-lg font-bold">
        <h1 className="text-2xl italic pb-2 border-b-2">TENANT PAGE</h1>
        <h2 className="font-thin pt-4">
          Welcome to your profile {adminProfile?.name}
        </h2>
      </header>
      <article className="text-lg">
        <h2 className="mb-4 text-3xl">Steps to use the app:</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <section className="flex flex-col w-full md:w-1/2 border-2 p-10 h-[250px]">
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

          <section className="flex flex-col w-full md:w-1/2 border-2 p-10 h-[250px]">
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
      <aside className="mx-6 border-2 p-10">
        <h3 className="mb-4 text-lg font-semibold">Known issues:</h3>
        <p className="mb-4 text-base italic">
          You may encounter some bugs, potentially particullary on mobile
          devices.
        </p>
        <ul className="list-disc text-start mb-4">
          <li>
            Tinder card dropdown buttons may be difficult to click on mobile.
          </li>
          <li>Currently reloading or refreshing the page will sign you out.</li>
        </ul>
        <p className="flex flex-col font-thin italic">
          <span>If you notice any other issues or have feature requests,</span>
          <span>just let me know.</span>
        </p>
      </aside>
      <footer>
        <p className="font-semibold tracking-wider">
          Lets find our next flatmate
        </p>
        <p>😁</p>
      </footer>
    </div>
  );
}
