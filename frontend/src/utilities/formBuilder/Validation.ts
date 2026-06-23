import validator from "validator";
import type { IElement } from "@/interfaces/formBuilder";
import { ApiClient } from "@/plugins/client/ApiClient";

export class Validation {

  constructor() {

  }

  IsMinimunCharacterLength = (element: IElement, count: number = 2): boolean => {
    const isEmpty = this.IsEmpty(element);

    if (isEmpty) return false;

    return element.Value.length >= count;
  }

  IsString = (element: IElement): boolean => {
    const isEmpty = this.IsEmpty(element);

    if (isEmpty) return false;

    if (typeof element.Value !== "string") return false;

    return (!validator.isNumeric(element.Value) && !validator.isBoolean(element.Value as string));
  }

  IsValid = async (): Promise<boolean> => {
    return true;
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


  IsStrongPassword = (element: IElement, matchedElement: IElement = {} as IElement): boolean => {
    const isEmpty = this.IsEmpty(element);
    const isMatchedElement = !matchedElement.Id ? true : this.MatchesValue(element, matchedElement);

    if (isEmpty || !isMatchedElement) return false;

    return validator.isStrongPassword(this.GetElementValue(element), {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
  }

  MatchesValue = (element: IElement, matchedElement: IElement): boolean => {
    const isEmpty = this.IsEmpty(element);
    const isMatchedElement = this.IsEmpty(matchedElement);

    if (isEmpty || !isMatchedElement) return false;

    return element.Value === matchedElement.Value;
  }

  IsValidCountry = async (element: IElement): Promise<boolean> => {
    const isEmpty = this.IsEmpty(element);
    const hasMinimumTwoCharacters = this.IsMinimunCharacterLength(element);
    const apiClient = new ApiClient();

    if (isEmpty || !hasMinimumTwoCharacters) return false;

    let found = false;

    const data: [] = await apiClient
      .lookup()
      .countries() as unknown as [];

    data.forEach((place: any) => {
      if (place.description.toLowerCase() === this.GetElementValue(element).toLowerCase()) found = true;
    })

    return found;
  }  
}