export class Projects {
  id!: number;
  projectName!: string;
  projectDescription!: string;
  projectType!: string;
  clientCountry!: string;
  clientIndustry!: string;
  clientLogo!: string;
  clientName!: string;
  projectDuration!: number;
  members!: number;
  clientRating!: number;
  features: Feature[] = [];
  clientReview!: string;
  projectImage!: string;
}
export interface Feature {
  featureName?: string;
}
