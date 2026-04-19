import type { IElement } from "@/interfaces";
import { ApiClient } from "@/plugins";

export const useValidators = () => {
  const apiClient = new ApiClient();
  const stringTag = "[object String]";
  const isArray = Array.isArray;
  const objectProto = Object.prototype;
  const nativeObjectToString = objectProto.toString;

  const ObjectToString = (value: any) => {
    return nativeObjectToString.call(value);
  }

  const BaseGetTag = (value: any) => {
    return ObjectToString(value);
  }

  const IsObjectLike = (value: any) => {
    return value != null && typeof value == "object";
  }

  const IsEmpty = (element: IElement): boolean => {
    if (element.isRequired) return element.value === "";

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

    return (!isArray(element.value) && IsObjectLike(element.value) && BaseGetTag(element.value) == stringTag);
  }

  const IsValidEmail = (element: IElement): boolean => {
    const isEmpty = IsEmpty(element);

    if (isEmpty) return false;

    return element.value
      ?.toString()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ? true : false;
  }

  const MatchesValue = (element: IElement, matchedElement: IElement): boolean => {
    const isEmpty = IsEmpty(element);
    const isMatchedElement = IsEmpty(matchedElement);

    if (isEmpty || !isMatchedElement) return false;

    return element.value === matchedElement.value;
  }

  const IsValidCountry = async (element: IElement): Promise<boolean> => {
    const isEmpty = IsEmpty(element);
    const isString = IsString(element);
    const hasMinimumTwoCharacters = IsMinimunCharacterLength(element);

    if (isEmpty || !hasMinimumTwoCharacters) return false;

    let found = false;

    const data: [] = await apiClient
      .lookup()
      .countries() as unknown as [];

    data.forEach((place: any) => {
      if (place.description === element.value) found = true;
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