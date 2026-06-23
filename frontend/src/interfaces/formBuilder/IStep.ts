import type { IFieldset } from "@/interfaces/formBuilder";

export interface IStep {
  Label: string;
  StepIndex: number;
  StepIcon?: string;
  InValidItemsCount: number;
  Fieldsets?: Array<IFieldset>;
}
