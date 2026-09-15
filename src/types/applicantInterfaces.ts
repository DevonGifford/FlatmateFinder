import { Timestamp } from "firebase/firestore";

import { TenantBooleanKey, TenantStarKey } from "@/lib/constants/tenants";

export type Rankings = Partial<
  Record<TenantStarKey, number> & Record<TenantBooleanKey, boolean>
>;

export interface ApplicantProfile {
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
  rankings?: Rankings;
  applicationDate: Timestamp;
  id?: string;
  photo?: string;
}
