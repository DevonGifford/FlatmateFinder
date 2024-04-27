export interface ApplicationInterface {
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
}

export const defaultApplication: ApplicationInterface = {
  uuid: "", // Replace with a unique identifier generation logic
  firstForm: {
    name: "",
    age: "",
    sex: "",
    phone: "",
    languages: [],
  },
  secondForm: {
    move_date: new Date(),
    length_stay: 0,
    meet_type: "",
    more_info: "",
  },
  thirdForm: {
    job_title: "",
    job_type: "",
    describe: "",
    hobbies: "",
    social_media: "",
  },
  applicationDate: new Date(),
};
