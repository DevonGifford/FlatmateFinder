import TinderCard from "react-tinder-card";
import StarRating from "@/components/StarRating";
import { useState } from "react";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import { IoFemale, IoMale, IoMaleFemale } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  CalendarClockIcon,
  ExternalLinkIcon,
  Home,
  User,
  Video,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Timestamp } from "firebase/firestore";

// import mockDB from "../assets/realmock-db.json";
import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useDataContext } from "@/components/contexts/data/useDataContext";
import { updateRanking } from "@/lib/firebase/firestore";
import { ApplicantProfile } from "@/lib/types/applicant-type";
import ImageWithFallback from "@/components/ProfilePic";
import { Rankings } from "@/lib/types/rawapplicant-type";

export default function TenantTinderPage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();
  const { data, updateDataContext } = useDataContext();
  const [currentCardIndex, setCurrentCardIndex] = useState(0); //- State to keep track of the current card being shown
  const [starRatings, setStarRatings] = useState<number[]>(
    Array(data?.length).fill(0)
  );
  const whichAdmin = (adminProfile?.name || "").substring(0, 3);

  // ✅ HANDLE STAR RATING - updates ranking field
  const handleStarClick = (starIndex: number, cardIndex: number) => {
    console.log(
      `🃏 Tinder handleStarClick:   Triggered 💢   - card ${cardIndex}`
    );
    const newRatings = [...starRatings];
    newRatings[cardIndex] = starIndex + 1;
    setStarRatings(newRatings);

    // 👇 Ensure adminProfile and data are not null or undefined
    if (adminProfile && data) {
      const currentAdmin = adminProfile.name;
      const cardData = data[cardIndex];

      // 👇 Identify admin and update data based on
      if (cardData) {
        const updatedCard = { ...cardData };
        updatedCard.rankings = updatedCard.rankings || {}; //-Ensure 'rankings' property is defined before updating its fields

        switch (currentAdmin) {
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

        // 👇 UPDATE THE STATE - update the context state with the modified user data
        updateDataContext([updatedCard]);
      }
    }
  };

  // ✅ HANDLE SWIPPING - updates boolean field
  const onSwipe = (direction: string, cardIndex: number) => {
    console.log(`🃏 Tinder onSwipe:   Triggered 💢   - card ${cardIndex}`);

    // 👇 Ensure adminProfile and data are not null or undefined
    if (adminProfile && data) {
      const currentAdmin = adminProfile.name;
      const cardData = data[cardIndex];

      // Ensure that rankings object exists before accessing its properties
      if (cardData) {
        const updatedCard = { ...cardData };
        updatedCard.rankings = updatedCard.rankings || {}; //-Ensure 'rankings' property is defined before updating its fields

        switch (currentAdmin) {
          case "Devon":
            updatedCard.rankings.dev_bool = direction === "right";
            break;
          case "Oscar":
            updatedCard.rankings.osc_bool = direction === "right";
            break;
          case "Adrian":
            updatedCard.rankings.adr_bool = direction === "right";
            break;
          // Add more cases if needed for other admins
          default:
            break;
        }

        // 👇 UPDATE THE STATE - update the context state with the modified user data
        updateDataContext([updatedCard]);

        //👇  Update the card Index number here only once per swipe
        setCurrentCardIndex(currentCardIndex + 1);
      }

      console.log("You swiped: " + direction);
    }
  };

  // ✅ HANADLE CARD LEAVING SCREEN - updates the applicantDoc
  const onCardLeftScreen = (myIdentifier: string, cardIndex: number) => {
    console.log(`🃏 Tinder onSwipe:   Triggered 💢   - card ${cardIndex}`);
    console.log("ℹ  ", myIdentifier + " left the screen");
    // 👇 Ensure data exists and the specific card's rankings are not undefined
    if (data && data[cardIndex]?.rankings) {
      const updatedRankings = data[cardIndex]
        .rankings as Partial<ApplicantProfile>;

      // 👇 Update the applicant document in Firestore with the updated rankings
      // console.log(
      //   "🃏🦺 Tinder onSwipe:  data being sent to the firebase function: ",
      //   updatedRankings
      // );
      updateRanking(data[cardIndex].uuid, updatedRankings);
      console.log(`🃏 Tinder onSwipe:   ✔ Successs - ranking updated`);
    } else {
      console.error(
        "Error: Unable to retrieve rankings for the specified card index."
      );
    }
  };

  // ✅ HANDLE ICONS & CONVERSIONS
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
      // Firestore Timestamp-like object with seconds and nanoseconds
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
        {data?.map((dataItem, index) => (
          <TinderCard
            key={index}
            onSwipe={(direction) => dataItem?.id && onSwipe(direction, index)}
            onCardLeftScreen={() => onCardLeftScreen(`card${index}`, index)}
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

                  <ImageWithFallback
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
                      Appllicant Introduction
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
                      filled={
                        starIndex <
                        (dataItem.rankings?.[
                          `${whichAdmin.toLowerCase()}_star` as keyof Rankings
                        ] || 0)
                      }
                      onClick={() => handleStarClick(starIndex, index)}
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
