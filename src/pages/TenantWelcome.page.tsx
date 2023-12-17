import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { Button } from "@/components/ui/button";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";

export default function TenantWelcomePage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-screen-md gap-8 py-8">
      <div className="flex flex-col text-lg font-bold">
        <div className="text-2xl italic pb-2 border-b-2">TENANT PAGE</div>
        <p className="font-thin pt-4">
          Welcome to your profile {adminProfile?.name}
        </p>
      </div>

      <div className="text-lg">
        <p className="mb-4 text-3xl">Steps to use the app:</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex flex-col w-full md:w-1/2 border-2 p-10 h-[250px]">
            <Button>
              <p className="font-semibold">The Tinderpage.</p>
            </Button>
            <p className="italic text-sm py-2">Rate and review applicants.</p>
            <ol className=" list-disc text-start mb-4">
              <li>Give each card a star rating.</li>
              <li>Swipe the card</li>
              <span className="text-sm italic">
                Left for no - Right for yes.
              </span>
            </ol>
          </div>

          <div className="flex flex-col w-full md:w-1/2 border-2 p-10 h-[250px]">
            <Button>
              <p className="font-semibold">The Leaderboard.</p>
            </Button>

            <p className="italic text-sm py-2">Based on the received stars.</p>
            <ol className="list-disc text-start mb-4">
              <li>Discover top-rated candidates</li>
              <li>Shows individual rankings</li>
              <span className="text-sm italic">Still very rudimentary</span>
            </ol>
          </div>
        </div>
      </div>

      <div className="mx-6">
        <p className="mb-4 text-lg font-semibold">Known issues:</p>
        <p className="mb-4 text-base italic">
          You may encounter some bugs, potentially particullary on mobile
          devices.
        </p>
        <ul className="list-disc text-start mb-4">
          <li>
            <span className="flex flex-row items-center">
              Tinder card dropdown buttons may be difficult to click on mobile.
            </span>
          </li>
          <li>
            Reloading page resets tinder cards, note your ratings are still
            saved.
          </li>

          <li>
            Need to create a sorting algorithm to hide unreviewed applications.
          </li>
          <span className=" font-light">
            - Feature to separate reviewed and unreviewed applications required.
          </span>
        </ul>
      </div>

      <div>
        <p>
          If you notice any other issues or have feature requests, please let me
          know.
        </p>
        <p>Lets find our next flatmate</p>
        <p>😅</p>
      </div>
    </div>
  );
}
