import validator from "validator";
import type { IElement } from "@/interfaces";
import { ApiClient } from "@/plugins";

export const useValidators = () => {
  const apiClient = new ApiClient();

  const IsEmpty = (element: IElement): boolean => {
    if (element.isRequired) return validator.isEmpty(element.value);

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

    return validator.isEmail(element.value);
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
      if (place.description.toLowerCase() === element.value.toLowerCase()) found = true;
    })

    return found;
  }

  return {
    IsEmpty,
    IsString,
    IsMinimunCharacterLength,
    IsValidEmail,
    MatchesValue,
    IsValidCountry
  }
}