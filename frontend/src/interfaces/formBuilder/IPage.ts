import type { IStep, IFieldset } from "@/interfaces/formBuilder";

export interface IPage {
  Name: string;
  Heading: string;
  RequiresAuthenticaton: boolean;
  Path?: string;
  Steps?: Array<IStep>;
  CurrentStepIndex: number;
  HasValidationErrors?: boolean;
}