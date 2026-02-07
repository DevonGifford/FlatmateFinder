import { Timestamp } from "firebase/firestore";
import * as z from "zod";

import {
  lengthOfStayRange,
  ratingRange,
} from "@/lib/constants/applicantConstraints";
import { tenants } from "@/lib/constants/tenants";

const timestampSchema = z.custom<Timestamp>(
  (value) => value instanceof Timestamp,
  "Expected a Firestore timestamp",
);

const rankingsSchema = z
  .object(
    Object.fromEntries(
      tenants.flatMap(({ id }) => [
        [
          `${id}_star`,
          z.number().int().min(ratingRange.min).max(ratingRange.max).optional(),
        ],
        [`${id}_bool`, z.boolean().optional()],
      ]),
    ),
  )
  .strict();

export const applicantProfileSchema = z
  .object({
    id: z.string(),
    uuid: z.string(),
    firstForm: z
      .object({
        name: z.string(),
        age: z.string(),
        sex: z.string(),
        phone: z.string(),
        languages: z.array(z.string()).optional(),
      })
      .strict(),
    secondForm: z
      .object({
        move_date: timestampSchema,
        length_stay: z
          .number()
          .int()
          .min(lengthOfStayRange.min)
          .max(lengthOfStayRange.max),
        meet_type: z.string(),
        more_info: z.string().optional(),
      })
      .strict(),
    thirdForm: z
      .object({
        job_title: z.string(),
        job_type: z.string(),
        describe: z.string(),
        hobbies: z.string(),
        social_media: z.string().optional(),
      })
      .strict(),
    rankings: rankingsSchema.optional(),
    applicationDate: timestampSchema,
    photo: z.string().optional(),
  })
  .strict();

export type ParsedApplicantProfile = z.infer<typeof applicantProfileSchema>;

/** Validates an unknown Firestore document and attaches its document ID. */
export function parseApplicantProfile(
  id: string,
  data: unknown,
): ParsedApplicantProfile | null {
  const document =
    typeof data === "object" && data !== null ? { id, ...data } : { id };
  const result = applicantProfileSchema.safeParse(document);

  return result.success ? result.data : null;
}
