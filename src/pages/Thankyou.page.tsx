import { useApplicantContext } from "@/components/contexts/applicant/useApplicantContext";

export default function ThankyouPage() {
  const { applicantProfile } = useApplicantContext();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-semibold italic mt-8">Thank you</div>
        <div className="text-2xl italic mt-4 mb-8">
          Look forward to living with you soon
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <span>UUID:</span>
          <span>{applicantProfile?.uuid}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Name:</span>
          <span>{applicantProfile?.firstForm.name}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Age:</span>
          <span>{applicantProfile?.firstForm.age}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Sex:</span>
          <span>{applicantProfile?.firstForm.sex}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Phone:</span>
          <span>{applicantProfile?.firstForm.phone}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Social Media:</span>
          <span>{applicantProfile?.firstForm.social_media}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Languages:</span>
          <span>
            {applicantProfile?.firstForm.languages?.join(", ") || "None"}
          </span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Move Date:</span>
          <span>{applicantProfile?.secondForm.move_date.toDateString()}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Length of Stay:</span>
          <span>{applicantProfile?.secondForm.length_stay}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Meet Type:</span>
          <span>{applicantProfile?.secondForm.meet_type}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>More Info:</span>
          <span>{applicantProfile?.secondForm.more_info}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Job Title:</span>
          <span>{applicantProfile?.thirdForm.job_title}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Job Type:</span>
          <span>{applicantProfile?.thirdForm.job_type}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Description:</span>
          <span>{applicantProfile?.thirdForm.describe}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Hobbies:</span>
          <span>{applicantProfile?.thirdForm.hobbies}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Photo:</span>
          <span>{applicantProfile?.thirdForm.photo}</span>
        </div>
        <div className="flex flex-row gap-3">
          <span>Application Date:</span>
          <span>{applicantProfile?.applicationDate.toDateString()}</span>
        </div>
      </div>
    </>
  );
}
