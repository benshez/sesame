import type { IElement } from "@/interfaces";
import { ApiClient } from "@/plugins";

const apiClient = new ApiClient();

export const useValidators = () => {

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

    return typeof element.value === "string";
  }

  const IsValidCountry = (element: IElement, countries: []): boolean => {
    let found = false;
    const x = countries
    countries.filter((e) => {
      console.log(e)}
    )
    console.log("Z", "");

    // countries.find((country: string) => {
    //   if (country === element.value) found = true;
    // })

    return found;
  }

  return {
    IsEmpty,
    IsString,
    HasTwoCharacters,
    IsValidCountry
  }
}