import { Timestamp } from "firebase/firestore";

import type { ApplicantProfile } from "@/types/applicant";

const demoDate = (isoDate: string) => Timestamp.fromDate(new Date(isoDate));

/**
 * Controlled demo profiles copied from the valid mocked applicant documents.
 * Demo tenants use this local data and never read or write Firebase records.
 */
export const demoApplicants: ApplicantProfile[] = [
  {
    id: "Adria-Alpha-39461",
    uuid: "Adria-Alpha-39461",
    firstForm: {
      name: "Ronald Weasley",
      age: "30",
      sex: "male",
      phone: "680721466",
      languages: ["English"],
    },
    secondForm: {
      move_date: demoDate("2023-12-14T13:01:20.828Z"),
      length_stay: 0,
      meet_type: "inperson",
      more_info: "Prefers quiet neighborhoods.",
    },
    thirdForm: {
      job_title: "Auror at the Ministry",
      job_type: "wfh",
      describe:
        "Friendly and adventurous wizard, looking for a quiet place to stay. I enjoy Quidditch and playing wizard chess in my free time. Not much for trees.",
      hobbies:
        "Hobbies include playing wizard chess and attending Quidditch matches.",
      social_media: "twitter.com/ronweasley",
    },
    rankings: {
      dev_star: 5,
      dev_bool: true,
      osc_star: 5,
      osc_bool: true,
      adr_star: 1,
      adr_bool: true,
    },
    applicationDate: demoDate("2023-12-14T13:01:20.828Z"),
    photo: "/demo/ronald-weasley.webp",
  },
  {
    id: "Bruce-Alpha-98841",
    uuid: "Bruce-Alpha-98841",
    firstForm: {
      name: "Bruce Wayne",
      age: "36",
      sex: "male",
      phone: "696617239",
      languages: ["English", "Other"],
    },
    secondForm: {
      move_date: demoDate("2024-01-30T23:00:00.000Z"),
      length_stay: 67,
      meet_type: "inperson",
      more_info: "Preferably seeking a place with a secure and private environment.",
    },
    thirdForm: {
      job_title: "Philanthropist",
      job_type: "hybrid",
      describe:
        "I am a dedicated businessman with a passion for driving positive change in Gotham City. My work at Wayne Enterprises has focused on innovation and philanthropy.",
      hobbies:
        "My hobbies include philanthropy work and exploring the city. I value my privacy and tend to keep a low profile.",
      social_media: "",
    },
    rankings: {
      dev_star: 2,
      dev_bool: false,
      osc_star: 4,
      osc_bool: true,
      adr_bool: false,
    },
    applicationDate: demoDate("2023-12-18T18:36:18.543Z"),
    photo: "/demo/bruce-wayne.webp",
  },
  {
    id: "Docto-Alpha-85457",
    uuid: "Docto-Alpha-85457",
    firstForm: {
      name: "Doctor Who",
      age: "33",
      sex: "male",
      phone: "696617239",
      languages: ["Other", "English"],
    },
    secondForm: {
      move_date: demoDate("2024-02-04T23:00:00.000Z"),
      length_stay: 64,
      meet_type: "inperson",
      more_info: "Can I see the apartment today?",
    },
    thirdForm: {
      job_title: "Doctor",
      job_type: "hybrid",
      describe:
        "I am a passionate and curious individual with a profound interest in history and science. I enjoy exploring the mysteries of the universe and learning about diverse cultures.",
      hobbies:
        "I find solace in stargazing and reading about ancient texts and lost civilizations. Restoring old gadgets and taking nature walks are also favorite pastimes.",
      social_media: "https://github.com/DevonGifford",
    },
    rankings: {
      dev_star: 3,
      dev_bool: true,
      osc_star: 3,
      osc_bool: false,
      adr_star: 5,
      adr_bool: true,
    },
    applicationDate: demoDate("2023-12-18T14:16:02.578Z"),
    photo: "/demo/doctor-who.webp",
  },
  {
    id: "Oscar-Alpha-21448",
    uuid: "Oscar-Alpha-21448",
    firstForm: {
      name: "Joffrey Baratheon",
      age: "28",
      sex: "female",
      phone: "+34696617233",
      languages: ["English", "Español"],
    },
    secondForm: {
      move_date: demoDate("2024-01-26T23:00:00.000Z"),
      length_stay: 48,
      meet_type: "inperson",
      more_info: "I need help carrying my bags",
    },
    thirdForm: {
      job_title: "King",
      job_type: "hybrid",
      describe:
        "Greetings, I am originally from the Seven Kingdoms. I am engaged in various royal duties and take time to pursue interests in the arts and history.",
      hobbies:
        "I enjoy archery, reading about dynasties, and exploring artistic expressions from different eras.",
      social_media: "https://github.com/DevonGifford",
    },
    rankings: {
      dev_star: 3,
      dev_bool: false,
      osc_star: 5,
      osc_bool: true,
      adr_star: 2,
      adr_bool: false,
    },
    applicationDate: demoDate("2023-12-16T16:43:22.283Z"),
    photo: "/demo/joffrey-baratheon.webp",
  },
  {
    id: "Riaan-Alpha-33773",
    uuid: "Riaan-Alpha-33773",
    firstForm: {
      name: "Patrick Bateman",
      age: "26",
      sex: "female",
      phone: "+34696617233",
      languages: ["English"],
    },
    secondForm: {
      move_date: demoDate("2024-01-26T23:00:00.000Z"),
      length_stay: 58,
      meet_type: "videocall",
      more_info: "",
    },
    thirdForm: {
      job_title: "Investment Banker",
      job_type: "hybrid",
      describe:
        "I value privacy and tranquility, seeking a place to unwind after long workdays. I am passionate about discussing psychology and societal roles.",
      hobbies:
        "I indulge in fine dining, fitness routines, contemporary literature, and cultural events.",
      social_media: "",
    },
    rankings: {
      dev_star: 4,
      dev_bool: false,
      osc_star: 4,
      osc_bool: true,
      adr_star: 3,
      adr_bool: true,
    },
    applicationDate: demoDate("2023-12-14T12:40:35.757Z"),
    photo: "/demo/patrick-bateman.webp",
  },
];
