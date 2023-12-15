// import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import {
  Building,
  CalendarClockIcon,
  ExternalLinkIcon,
  Home,
  StarIcon,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";
import { IoFemale, IoMale, IoMaleFemale } from "react-icons/io5";
import TinderCard from "react-tinder-card";

import mockDB from "../assets/mock-db.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TenantTinderPage() {
  useRequireAdmin();
  // const { adminProfile } = useAdminContext();
  // const [starRating, setStarRating] = useState<number | null>(null);

  const genderIcon = (gender: string) => {
    if (gender === "male") {
      return <IoMale />;
    } else if (gender === "female") {
      return <IoFemale />;
    } else {
      return <IoMaleFemale />;
    }
  };

  const jobtypeIcon = (jobType: string) => {
    if (jobType === "wfh") {
      return <Home size={16} />;
    } else if (jobType === "office") {
      return <Building size={16} />;
    } else {
      return <Video size={16} />;
    }
  };

  const viewingtypeIcon = (viewType: string) => {
    if (viewType === "meet_type") {
      return <User className="font-bold" size={18} />;
    } else {
      return <Video size={18} />;
    }
  };

  const lengthStayIcon = (lengthStay: number) => {
    if (lengthStay < 80) {
      return "Long";
    } else if (lengthStay > 80 && lengthStay < 30) {
      return "Medium";
    } else {
      return "Short";
    }
  };

  // State to keep track of the current card being shown
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Handle swipe
  const onSwipe = (direction: string) => {
    console.log("You swiped: " + direction);
    // Update current card index on swipe
    if (direction === "right" && currentCardIndex < mockDB.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    // Handle other swipe directions as needed
  };

  // Handle when a card leaves the screen
  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + " left the screen");
    // Perform actions if needed when a card leaves the screen
  };

  return (
    <>
      <div className="flex h-[calc(100vh-10vh)] flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8 overscroll-none">
        {/* <div className="text-4xl italic py-4 pb-6 border-b-2 fixed top-10">
          <span>TINDER PAGE</span>
        </div> */}
        {mockDB.map((dataItem, index) => (
          <TinderCard
            key={index}
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen(`card${index}`)}
            preventSwipe={["up", "down"]}
            className="absolute w-[310px] md:w-[500px]"
          >
            <Card className="h-[500px] md:h-fit overflow-x-auto">
              <CardHeader>
                <CardTitle>{dataItem.firstForm.name}</CardTitle>
                <CardDescription className="flex flex-row justify-center items-center gap-2 text-base font-semibold ">
                  <span>{dataItem.thirdForm.job_title}</span>{" "}
                  <span>{jobtypeIcon(dataItem.thirdForm.job_type)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-row justify-around items-center">
                  <div className="flex flex-col gap-2 justify-start text-left text-sm">
                    {/* //👇 ENTRY DATE  */}
                    <div className="flex flex-row items-center gap-1">
                      <CalendarClockIcon size={16} />
                      <p>Desired Entry:</p>
                      <span className="font-normal">
                        {new Date(
                          dataItem.secondForm.move_date
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "2-digit",
                        })}
                      </span>
                    </div>
                    {/* //👇 AGE & GENDER */}
                    <div className="flex flex-row gap-5">
                      <div className="flex flex-row gap-2 items-center p-1">
                        <h3>Age:</h3>
                        <span>{dataItem.firstForm.age}</span>
                      </div>

                      <div className="flex flex-row gap-2 items-center p-1">
                        <h3>Sex:</h3>
                        <span>{genderIcon(dataItem.firstForm.sex)}</span>
                      </div>
                    </div>

                    {/* //👇 LANGUAGES  */}
                    <div>
                      {dataItem.firstForm.languages &&
                        dataItem.firstForm.languages.length > 0 && (
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {dataItem.firstForm.languages.map(
                                (lang, index) => (
                                  <span
                                    key={index}
                                    className="p-1 px-2 text-xs font-semibold rounded-xl bg-sky-400/20"
                                  >
                                    {lang}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {/* Additional content or logic if languages are empty or don't exist */}
                    </div>

                    {/* //👇 SOCIAL MEDIA */}
                    <a
                      className="flex flex-row items-center gap-1 hover:text-blue-500 pt-1"
                      href={`${dataItem.thirdForm.social_media}`}
                    >
                      <h3>Social Media Link </h3>
                      <ExternalLinkIcon size={13} />
                    </a>
                  </div>
                  {/* //👇 PROFILE PICTURE */}
                  <img
                    src={dataItem.photo || "/profile-fallback.svg"}
                    alt="profile-pic"
                    width={90}
                    height={20}
                    className="flex justify-center items-center rounded-full "
                  />
                </div>

                {/* //👇 Viewing & Length of Stay */}
                <div className="flex flex-row w-full justify-evenly items-center text-sm font-semibold">
                  <div className="flex flex-col justify-center items-center p-2 rounded-lg border">
                    <p>Viewing type: </p>
                    <span className="font-normal p-2 rounded full px-3">
                      {viewingtypeIcon(dataItem.secondForm.meet_type)}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center items-center p-2 rounded-lg border">
                    <p>Length of stay: </p>
                    <span className="font-semibold p-2 rounded full px-3">
                      {lengthStayIcon(dataItem.secondForm.length_stay)}
                    </span>
                  </div>
                </div>

                {/* //👇 ABOUT SECTION & HOBBIES/INTEREST & SPECIAL REQUEST */}
                <Accordion
                  type="single"
                  collapsible
                  className="w-full text-center"
                >
                  <AccordionItem className="border-none py-1" value={"about"}>
                    <AccordionTrigger className="flex-col justify-center gap-1 py-1 text-lg hover:no-underline">
                      About me
                    </AccordionTrigger>
                    <AccordionContent className="mx-8 text-sm italic font-normal">
                      {dataItem.thirdForm.describe}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem className="border-none py-1" value={"hobbies"}>
                    <AccordionTrigger className="flex-col justify-center gap-1 py-1 text-lg hover:no-underline">
                      Hobbies & Interests
                    </AccordionTrigger>
                    <AccordionContent className="mx-8 text-sm italic font-normal">
                      {dataItem.thirdForm.hobbies}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem className="border-none py-1" value={"special"}>
                    <AccordionTrigger className="flex-col justify-left gap-1 py-1 text-sm hover:no-underline">
                      Special Request
                    </AccordionTrigger>
                    <AccordionContent className="mx-8 text-sm italic font-normal">
                      {dataItem.secondForm.more_info}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex flex-col text-center justify-center items-center border-t-2 mx-10">
                <p className="text-xs italic font-thin pt-2">{dataItem.uuid}</p>

                <div>
                  <StarIcon />
                  <StarIcon className=" fill-yellow-500" />
                </div>
              </CardFooter>
            </Card>
          </TinderCard>
        ))}
      </div>
    </>
  );
}
