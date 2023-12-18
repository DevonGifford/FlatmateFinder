import { Timestamp } from "firebase/firestore";

export type RawApplicantProfile = {
  uuid: string;
  firstForm: {
    name: string;
    age: string;
    sex: string;
    phone: string;
    languages?: string[];
  };
  secondForm: {
    move_date: Timestamp;
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
  applicationDate: Timestamp;
  id?: string;
  photo?: string;
};

