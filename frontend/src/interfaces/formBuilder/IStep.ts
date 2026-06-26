import type { IFieldset } from "@/interfaces/formBuilder";

export interface IStep {
  Label: string;
  StepIndex: number;
  StepIcon?: string;
  HasValidationErrors?: boolean;
  Fieldsets?: Array<IFieldset>;
}
