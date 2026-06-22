import type { IElement } from "@/interfaces/formBuilder";

export interface IStep {
  Label: string;
  StepIndex: number;
  StepIcon?: string;
  InValidItemsCount: number;
  Elements?: Array<IElement>;
}
