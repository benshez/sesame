import type { IField } from "@/interfaces/formBuilder";

export interface IFieldset {
  Label?: string;
  Description?: string;
  Fields?: Array<IField> | undefined;
}