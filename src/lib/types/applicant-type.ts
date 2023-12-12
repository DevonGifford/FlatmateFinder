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
      photo: string;
    };
    applicationDate: Date;
  };