import {type IOption, type IValidator} from "@/interfaces";

export interface IElement {
  id?: string;
  label?: string;
  component: string;
  value: string;
  helpText?: string;
  placeholderText?: string;
  options?: Array<IOption>;
  isRequired?: boolean;
  isValid?:  boolean;
  isValidIf?: Function;
  isReadonly?: boolean,
  isVisible?: boolean,
  isVisibleIf?: Function,
  cssClass?: string;
  type?: string;
  labelIcon?: string;
}