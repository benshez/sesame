import type { IElement } from "@/interfaces/formBuilder";

export interface IFieldset {
  Label?: string;
  Description?: string;
  Elements?: Array<IElement> | undefined;
}