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

  const HasTwoCharacters = (element: IElement): boolean => {
    const isEmpty = IsEmpty(element);

    if (isEmpty) return false;

    return element.value.length >= 2;
  }

  const IsString = (element: IElement): boolean => {
    const isEmpty = IsEmpty(element);

    if (isEmpty) return false;

    if (typeof element.value !== "string") return false;

    return (!isArray(element.value) && IsObjectLike(element.value) && BaseGetTag(element.value) == stringTag);
  }

  const IsValidCountry = async (element: IElement): Promise<boolean> => {
    const isEmpty = IsEmpty(element);
    const isString = IsString(element);
    const hasTwoCharacters = HasTwoCharacters(element);

    if (isEmpty || !isString || !hasTwoCharacters) return false;

    let found = false;

    const data: [] = await apiClient
      .lookup()
      .countries() as unknown as [];

    data.forEach((place) => {
      if (place === element.value) found = true;
    })

    return found;
  }

  return {
    IsEmpty,
    IsString,
    HasTwoCharacters,
    IsValidCountry
  }
}