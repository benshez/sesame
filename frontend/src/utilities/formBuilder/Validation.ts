import validator from "validator";
import type { IElement } from "@/interfaces/formBuilder";

export class Validation {

  private Element: IElement = {} as IElement;

  constructor() {

  }

  IsValid = async (): Promise<boolean> => {
    return false;
  }

  GetElementValue = (element: IElement): string => {
    let value: string = "";

    if (typeof element.Value === "string") {
      value = element.Value;
    } else {
      value = element.Value.at(0) as string;
    }

    return value;
  }

  IsEmpty = (element: IElement): boolean => {
    if (element.IsRequired) return validator.isEmpty(this.GetElementValue(element));

    return true;
  }

  IsValidEmail = (element: IElement): boolean => {
    const isEmpty = this.IsEmpty(element);

    if (isEmpty) return false;

    return validator.isEmail(this.GetElementValue(element));
  }
}