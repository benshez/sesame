import type { IStep, IElement } from "@/interfaces/formBuilder";

export interface IPage {
  Name: string;
  Heading: string;
  RequiresAuthenticaton: boolean;
  Path?: string;
  Steps?: Array<IStep>;
  CurrentStepIndex: number;
  Elements?: Array<IElement> | undefined;
  HasValidationErrors?: boolean;
}