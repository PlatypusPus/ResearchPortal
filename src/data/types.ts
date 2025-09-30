export type Role = 'Applicant' | 'Committee' | 'Dean' | 'Principal' | 'Admin';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface ApplicationComment {
  id: string;
  role: Role;
  userId: string;
  message: string;
  createdAt: string;
}

export type ApplicationStatus = 'Pending' | 'Committee Review' | 'Dean Review' | 'Principal Review' | 'Approved' | 'Denied';

export interface CommitteeAssessment {
  committeeUserId: string; // which committee member
  publicationIncentiveApplicable?: boolean; // question 1
  conferenceRegistrationChargeApplicable?: boolean; // question 2
  decision?: 'Approved' | 'Denied'; // individual member decision
  decidedAt?: string;
}

export interface Application {
  id: string;
  applicantName: string;
  title: string;
  applicationType: string;
  publicationType: string;
  journalOrConference: string;
  quartile: string;
  impactFactor: string;
  indexingType: string;
  publisher: string;
  conferencePlaceDate: string;
  registrationFee?: string;
  createdAt: string;
  status: ApplicationStatus;
  comments: ApplicationComment[];
  committeeAssessments?: CommitteeAssessment[]; // one per committee member
  deanRecommendation?: {
    grantAmount?: number;
    publicationIncentive?: number;
    firstAuthorShare?: number;
    correspondingAuthorShare?: number;
    coAuthorShare?: number;
  };
  finalDecision?: 'Approved' | 'Rejected';
}
