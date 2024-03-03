import TinderCard from "react-tinder-card";
import { useState } from "react";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { useGlobalDispatch } from "@/lib/hooks/useGlobalDispatch";
import { useRequireTenant } from "@/lib/hooks/useRequireTenant";
import { updateRanking } from "@/lib/firebase/firestore";
import { toastError } from "@/lib/customToast";
import { ProfilePic } from "@/components/ProfilePic";
import { StarRating } from "@/components/StarRating";
import { Rankings } from "@/lib/interfaces/applicantInterfaces";
import { ApplicationInterface } from "@/lib/interfaces/applicationInterfaces";
import { Timestamp } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building,
  CalendarClockIcon,
  ExternalLinkIcon,
  Home,
  User,
  Video,
} from "lucide-react";
import { IoFemale, IoMale, IoMaleFemale } from "react-icons/io5";

export default function TenantTinderPage() { useRequireTenant();
  const dispatch = useGlobalDispatch();
  const { applicantPool, loggedTenant } = useGlobalState();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [starRatings, setStarRatings] = useState<number[]>(
    Array(applicantPool?.length).fill(0)
  );

  const adminId = (loggedTenant || "").substring(0, 3).toLowerCase();

  //- Handle star-ranking individual applicants - updates global context
  const handleStarClick = (starIndex: number, cardIndex: number) => {
    const newRatings = [...starRatings];
    newRatings[cardIndex] = starIndex + 1;
    setStarRatings(newRatings);

    if (loggedTenant && applicantPool) {
      const cardData = applicantPool[cardIndex];

      if (cardData) {
        const updatedCard = { ...cardData };
        updatedCard.rankings = updatedCard.rankings || {};
        switch (loggedTenant) {
          case "Devon":
            updatedCard.rankings.dev_star = starIndex + 1;
            break;
          case "Oscar":
            updatedCard.rankings.osc_star = starIndex + 1;
            break;
          case "Adrian":
            updatedCard.rankings.adr_star = starIndex + 1;
            break;
          default:
            break;
        }
        dispatch({ type: "UPDATE_APPLICANT_POOL", payload: [updatedCard] });
      }
    }
  };

  //- Handle swipe-ranking individual applicants - updates global context + sets next card
  const onSwipe = (direction: string, cardIndex: number) => {
    if (loggedTenant && applicantPool) {
      const cardData = applicantPool[cardIndex];

      if (cardData) {
        const updatedCard = { ...cardData };
        updatedCard.rankings = updatedCard.rankings || {};
        switch (loggedTenant) {
          case "Devon":
            updatedCard.rankings.dev_bool = direction === "right";
            break;
          case "Oscar":
            updatedCard.rankings.osc_bool = direction === "right";
            break;
          case "Adrian":
            updatedCard.rankings.adr_bool = direction === "right";
            break;
          default:
            break;
        }

        dispatch({ type: "UPDATE_APPLICANT_POOL", payload: [updatedCard] });
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
  };

  //- Handle card leaving screen - updates the firestore database
  const onCardLeftScreen = (cardIndex: number) => {
    if (applicantPool && applicantPool[cardIndex]?.rankings) {
      const updatedRankings = applicantPool[cardIndex]
        .rankings as Partial<ApplicationInterface>;

      updateRanking(applicantPool[cardIndex].uuid, updatedRankings);
    } else {
      toastError("Something went wrong");
    }
  };

  //- General Helper Function - Icons & Conversions
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
  const convertTimestamp = (timeStamp: Timestamp) => {
    if (timeStamp?.seconds) {
      //-Firestore Timestamp-like object ~ seconds and nanoseconds
      const date = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
      );

      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return formattedDate;
    } else {
      return "Invalid Date";
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-10vh)] flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-2 md:gap-8 overscroll-none">
        {applicantPool?.map((dataItem, index) => (
          <TinderCard
            key={index}
            onSwipe={(direction) => dataItem?.id && onSwipe(direction, index)}
            onCardLeftScreen={() => onCardLeftScreen(index)}
            preventSwipe={["up", "down"]}
            className="absolute w-[310px] md:w-[500px]"
          >
            <Card className="h-fit overflow-x-auto">
              <CardHeader>
                <CardTitle>{dataItem.firstForm.name}</CardTitle>
                <CardDescription className="flex flex-row justify-center items-center gap-1 text-base font-semibold ">
                  <span>{dataItem.thirdForm.job_title}</span>{" "}
                  <span>{jobtypeIcon(dataItem.thirdForm.job_type)}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-1 sm:gap-3">
                {/* //👇 ENTRY DATE  */}
                <div className="flex flex-row items-center gap-1 text-sm">
                  <CalendarClockIcon size={16} />
                  <p className=" font-semibold">Desired Entry:</p>
                  <span className="font-normal pl-1">
                    {convertTimestamp(dataItem.secondForm.move_date)}
                  </span>
                </div>
                <div className="flex flex-row justify-around items-center">
                  <div className="flex flex-col gap-1 justify-start text-left text-sm">
                    {/* //👇 AGE & GENDER */}
                    <div className="flex flex-row gap-5">
                      <div className="flex flex-row gap-2 items-center p-1">
                        <h3 className="font-semibold">Age:</h3>
                        <span>{dataItem.firstForm.age}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center p-1">
                        <h3 className="font-semibold">Sex:</h3>
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
                  <ProfilePic
                    src={dataItem.photo}
                    fallbackSrc="/profile-fallback.svg"
                    alt="profile-pic"
                    width={100}
                    height={100}
                    className="flex justify-center items-center rounded-full"
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
                    <AccordionTrigger className="flex-col justify-center sm:gap-1 py-1 text-sm sm:text-lg hover:no-underline">
                      Applicant Introduction
                    </AccordionTrigger>
                    <AccordionContent className="mx-8 text-xs sm:text-sm italic font-normal">
                      {dataItem.thirdForm.describe}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem className="border-none py-1" value={"hobbies"}>
                    <AccordionTrigger className="flex-col justify-center sm:gap-1 py-1 text-sm sm:text-base hover:no-underline">
                      Hobbies & Interests
                    </AccordionTrigger>
                    <AccordionContent className="mx-8 text-xs sm:text-sm italic font-normal">
                      {dataItem.thirdForm.hobbies}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem className="border-none py-1" value={"special"}>
                    <AccordionTrigger className="flex-col justify-left sm:gap-1 py-1 text-sm hover:no-underline">
                      Special Request
                    </AccordionTrigger>
                    <AccordionContent className="mx-8 text-xs sm:text-sm italic font-normal">
                      {dataItem.secondForm.more_info}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>

              <CardFooter className="flex flex-col text-center pt-1 sm:pt-4 justify-center items-center border-t-2 mx-10">
                {/* //👇 STAR RATING SYSTEM */}
                <div className="flex flex-row gap-3 pt-1 ">
                  {[...Array(5)].map((_, starIndex) => (
                    <StarRating
                      key={starIndex}
                      onClick={() => handleStarClick(starIndex, index)}
                      filled={
                        starIndex <
                        (dataItem.rankings?.[
                          `${adminId}_star` as keyof Rankings
                        ] || 0)
                      }
                    />
                  ))}
                </div>
              </CardFooter>
            </Card>
          </TinderCard>
        ))}
      </div>
    </>
  );
}
