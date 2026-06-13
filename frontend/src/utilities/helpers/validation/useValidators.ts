import validator from "validator";
import type { IElement } from "@/interfaces";
import { ApiClient } from "@/plugins/client/ApiClient";

export const useValidators = () => {
  const apiClient = new ApiClient();

  const GetElementValue = (element: IElement): string => {
    let value: string = "";

    if (typeof element.value === "string") {
      value = element.value;
    } else {
      value = element.value.at(0) as string;
    }
;
    return value
  }
  const IsEmpty = (element: IElement): boolean => {
    if (element.isRequired) return validator.isEmpty(GetElementValue(element));

    return true;
  }

  const IsMinimunCharacterLength = (element: IElement, count: number = 2): boolean => {
    const isEmpty = IsEmpty(element);

    if (isEmpty) return false;

    return element.value.length >= count;
  }

  const IsString = (element: IElement): boolean => {
    const isEmpty = IsEmpty(element);

    if (isEmpty) return false;

    if (typeof element.value !== "string") return false;

    return (!validator.isNumeric(element.value) && !validator.isBoolean(element.value as string));
  }

  const IsValidEmail = (element: IElement): boolean => {
    const isEmpty = IsEmpty(element);

    if (isEmpty) return false;

    return validator.isEmail(GetElementValue(element));
  }

  const IsStrongPassword = (element: IElement, matchedElement: IElement = {} as IElement): boolean => {
    const isEmpty = IsEmpty(element);
    const isMatchedElement = !matchedElement.id ? true : MatchesValue(element, matchedElement);

    if (isEmpty || !isMatchedElement) return false;

    return validator.isStrongPassword(GetElementValue(element), {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
  }

  const MatchesValue = (element: IElement, matchedElement: IElement): boolean => {
    const isEmpty = IsEmpty(element);
    const isMatchedElement = IsEmpty(matchedElement);

    if (isEmpty || !isMatchedElement) return false;

    return element.value === matchedElement.value;
  }

  const IsValidCountry = async (element: IElement): Promise<boolean> => {
    const isEmpty = IsEmpty(element);
    const hasMinimumTwoCharacters = IsMinimunCharacterLength(element);

    if (isEmpty || !hasMinimumTwoCharacters) return false;

    let found = false;

    const data: [] = await apiClient
      .lookup()
      .countries() as unknown as [];

    data.forEach((place: any) => {
      if (place.description.toLowerCase() === GetElementValue(element).toLowerCase()) found = true;
    })

    return found;
  }

  return {
    IsEmpty,
    IsString,
    IsMinimunCharacterLength,
    IsValidEmail,
    IsStrongPassword,
    MatchesValue,
    IsValidCountry
  }
}