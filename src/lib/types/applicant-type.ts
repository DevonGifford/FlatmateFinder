export type ApplicantProfile = {
  uuid: string;
  firstForm: {
    name: string;
    age: string;
    sex: string;
    phone: string;
    languages?: string[];
  };
  secondForm: {
    move_date: Date;
    length_stay: number;
    meet_type: string;
    more_info?: string;
  };
  thirdForm: {
    job_title: string;
    job_type: string;
    describe: string;
    hobbies: string;
    social_media?: string;
  };
  rankings?: {
    dev_star?: number;
    dev_bool?: boolean;
    adr_star?: number;
    adr_bool?: boolean;
    osc_star?: number;
    osc_bool?: boolean;
  };
  applicationDate: Date;
  id?: string;
  photo?: string;
};

export const defaultApplicant: ApplicantProfile = {
  uuid: "devtesting0000", // Replace with a unique identifier generation logic
  firstForm: {
    name: "John Doe",
    age: "25",
    sex: "Male",
    phone: "123-456-7890",
    languages: ["English", "Spanish"],
  },
  secondForm: {
    move_date: new Date(),
    length_stay: 6,
    meet_type: "In person",
    more_info: "Additional information about the move",
  },
  thirdForm: {
    job_title: "Software Engineer",
    job_type: "Full-time",
    describe:
    "Experienced software engineer with expertise in web development.",
    hobbies: "Reading, hiking, coding",
    social_media: "john.doe",
  },
  applicationDate: new Date() ,
};
