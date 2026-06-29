import type { IOption, IKeyValue } from "@/interfaces/formBuilder";

export interface IField {
  Id?: string;
  Label?: string;
  Component: string;
  Value: string | Array<string>;
  HelpText?: string;
  PlaceholderText?: string;
  Options?: Object | Array<IOption>;
  IsRequired?: boolean;
  IsValid?: boolean;
  IsValidIf?: Array<IKeyValue> | null;
  IsReadonly?: boolean;
  IsVisible?: boolean;
  IsVisibleIf?: Array<IKeyValue> | null;
  CssClass?: string;
  Type?: string;
  LabelIcon?: string;
  Score?: Array<IKeyValue> | null; 
}
