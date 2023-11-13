import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
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
  User,
  Video,
} from "lucide-react";
import { IoFemale, IoMale, IoMaleFemale } from "react-icons/io5";

const tesApp = {
  uuid: "devtesting0003",
  firstForm: {
    name: "David Brown",
    age: "23",
    sex: "male",
    phone: "333-777-9999",
    languages: ["English", "Spanish"],
  },
  secondForm: {
    move_date: "2023-09-05T00:00:00.000Z",
    length_stay: 10,
    meet_type: "Virtual",
    more_info: "",
  },
  thirdForm: {
    job_title: "Graphic Designer",
    job_type: "Hybrid",
    describe: "Creative designer with expertise in digital illustrations.",
    hobbies: "Sketching, photography, gaming",
    social_media: "david.brown",
  },
  applicationDate: "2023-12-14T00:00:00.000Z",
  photo: "https://avatars.githubusercontent.com/u/118319299?v=4",
};

export default function TenantTinderPage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();

  const {
    firstForm: { name, age, languages },
    secondForm: { meet_type, length_stay, more_info },
    thirdForm: { job_title, job_type, describe, hobbies },
    photo,
  } = tesApp;

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

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6 border-b-2">TINDER PAGE</div>
        <p>
          You are currently signed in as the following tenant:{" "}
          {adminProfile?.name}
        </p>
        <Card className="min-w-[300px]">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription className="flex flex-row justify-center items-center gap-2 text-base font-semibold ">
              <span>{job_title}</span> <span>{jobtypeIcon(job_type)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-2 justify-start text-left text-sm">
                {/* //👇 ENTRY DATE  */}
                <div className="flex flex-row items-center gap-1">
                  <CalendarClockIcon size={16} />
                  <p>Desired Entry:</p>
                  <span className="font-normal">2 Feb '24</span>
                </div>

                {/* //👇 AGE & GENDER */}
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2 items-center p-1">
                    <h3>Age:</h3>
                    <span>{age}</span>
                  </div>

                  <div className="flex flex-row gap-2 items-center p-1">
                    <h3>Sex:</h3>
                    <span>{genderIcon(tesApp.firstForm.sex)}</span>
                  </div>
                </div>

                {/* //👇 LANGUAGES  */}
                <div>
                  {languages && languages.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {languages.map((lang, index) => (
                          <span
                            key={index}
                            className="p-1 px-2 text-xs font-semibold rounded-xl bg-sky-400/20"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Additional content or logic if languages are empty or don't exist */}
                </div>

                {/* //👇 SOCIAL MEDIA */}
                <a className="flex flex-row items-center gap-1 hover:text-blue-500 pt-1">
                  <h3>Social Media Link </h3>
                  <ExternalLinkIcon size={13} />
                </a>
              </div>
              {/* //👇 PROFILE PICTURE */}
              <img
                src={photo || "/profile-fallback.svg"}
                alt="profile-pic"
                width={110}
                height={20}
                className="flex justify-center items-center rounded-full "
              />
            </div>
            {/* //👇 SPECIAL REQUEST  */}
            {more_info && (
              <div className="flex flex-col text-left text-sm font-semibold">
                <p>Special Request: </p>
                <span className="text-sm italic font-normal">{more_info}</span>
              </div>
            )}

            {/* //👇 Viewing & Length of Stay */}
            <div className="flex flex-row w-full justify-evenly items-center text-sm font-semibold">
              <div className="flex flex-col justify-center items-center p-2 rounded-lg border">
                <p>Viewing type: </p>
                <span className="font-normal p-2 rounded full px-3">
                  {viewingtypeIcon(meet_type)}
                </span>
              </div>

              <div className="flex flex-col justify-center items-center p-2 rounded-lg border">
                <p>Length of stay: </p>
                <span className="font-semibold p-2 rounded full px-3">
                  {lengthStayIcon(length_stay)}
                </span>
              </div>
            </div>

            {/* //👇 ABOUT SECTION  */}
            <div className="rounded-lg border p-2">
              <h2 className="font-semibold ">About</h2>
              <p className="text-sm italic font-normal">{describe}</p>
            </div>

            {/* //👇 HOBBIES/INTEREST */}
            <div className="rounded-lg border p-2">
              <h2 className="font-semibold">Hobbies</h2>
              <p className="text-sm italic font-normal">{hobbies}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col text-center justify-center items-center border-t-2 mx-10">
            <p className="text-xs italic font-thin pt-2">{tesApp.uuid}</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
