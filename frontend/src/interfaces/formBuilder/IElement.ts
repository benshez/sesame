import type { IOption, IKeyValue } from "@/interfaces/formBuilder";

export interface IElement {
  Id?: string;
  Label?: string;
  Component: string;
  Value: string | Array<string>;
  HelpText?: string;
  PlaceholderText?: string;
  Options?: Object | Array<IOption>;
  IsRequired?: boolean;
  IsValid?: boolean;
  IsValidIf?: IKeyValue | null;
  IsReadonly?: boolean,
  IsVisible?: boolean,
  IsVisibleIf?: IKeyValue | null,
  CssClass?: string;
  Type?: string;
  LabelIcon?: string;
}
