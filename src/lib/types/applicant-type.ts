export type ApplicantProfile = {
  uuid: string;
  firstForm: {
    name: string;
    age: string;
    sex: string;
    phone: string;
    social_media?: string;
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
    job_type?: string;
    describe: string;
    hobbies: string;
    photo: string | undefined;
  };
  applicationDate: Date;
};

export const defaultApplicant: ApplicantProfile = {
  uuid: "devtesting0000", // Replace with a unique identifier generation logic
  firstForm: {
    name: "John Doe",
    age: "25",
    sex: "Male",
    phone: "123-456-7890",
    social_media: "john.doe",
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
    photo: "path/to/default/photo.jpg", // Replace with a default photo path
  },
  applicationDate: new Date(),
};
