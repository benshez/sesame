import type { IElement } from "@/interfaces/formBuilder";

export interface IStep {
  Label: string;
  StepIndex: number;
  InValidItemsCount: number;
  Elements?: Array<IElement>;
}
