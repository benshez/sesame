import validator from "validator";
import type { IField, IKeyValue } from "@/interfaces/formBuilder";
import { ApiClient } from "@/plugins/client/ApiClient";

export class Validation {

  constructor() { }

  IsValid = async (Element: IField, MatchedElement: IField = {} as IField): Promise<boolean> => {
    const IsValidIfs: Array<IKeyValue> = Element.IsValidIf as Array<IKeyValue>;
    const IsObject: boolean = typeof IsValidIfs === "object" || false;
    const HasItems: boolean = IsValidIfs.length !== 0;
    const HasMatchedElement: boolean = Object.keys(MatchedElement).length > 0;
    let IsValid: boolean = true;

    if (!IsObject || !HasItems) return IsValid;

    for (const IsValidIf of IsValidIfs) {
      const Keys: Array<string> = Array.isArray(IsValidIf.Key) ? IsValidIf.Key : [IsValidIf.Key] as Array<string>;
      const Values: Array<string> = Array.isArray(IsValidIf.Value) ? IsValidIf.Value : [IsValidIf.Value] as Array<string>;

      for (const Key of Keys) {
        const Index = Keys.indexOf(Key) | 0;
        const Value = Values[Index];

        switch (Key.toString().toLowerCase()) {
          case "class":
            const Method = Reflect.get(this, Value);
            const IsFunction = typeof Method === "function";

            if (IsFunction) {
              if (HasMatchedElement) {
                return await Method.call(this, Element, MatchedElement);
              } else {
                return await Method.call(this, Element);
              }
            }

            break;
          default:
            if (Element.IsValid && (Element.Value === Key || (Element.Value !== "" && Key === "*"))) {
              return true;
            }

            break;
        }
      }
    }

    return IsValid;
  }

  IsMinimumCharacterLength = (element: IField, count: number): boolean => {
    const isEmpty = this.IsEmpty(element);

    if (isEmpty) return false;

    return element.Value.length >= count;
  }

  IsMinimumTwoCharacterLength = (element: IField): boolean => {
    return this.IsMinimumCharacterLength(element, 2);
  }

  IsString = (element: IField): boolean => {
    const isEmpty = this.IsEmpty(element);

    if (isEmpty) return false;

    if (typeof element.Value !== "string") return false;

    return (!validator.isNumeric(element.Value) && !validator.isBoolean(element.Value as string));
  }

  GetElementValue = (element: IField): string => {
    let value: string = "";

    if (typeof element.Value === "string") {
      value = element.Value;
    } else {
      value = element.Value.at(0) as string;
    }

    return value;
  }

  IsEmpty = (element: IField): boolean => {
    if (element.IsRequired) return validator.isEmpty(this.GetElementValue(element));

    return true;
  }

  IsValidEmail = (element: IField): boolean => {
    const isEmpty = this.IsEmpty(element);

    if (isEmpty) return false;

    return validator.isEmail(this.GetElementValue(element));
  }


  IsStrongPassword = (element: IField, matchedElement: IField = {} as IField): boolean => {
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

  MatchesValue = (element: IField, matchedElement: IField): boolean => {
    const isEmpty = this.IsEmpty(element);
    const isMatchedElement = this.IsEmpty(matchedElement);

    if (isEmpty || !isMatchedElement) return false;

    return element.Value === matchedElement.Value;
  }

  IsValidCountry = async (element: IField): Promise<boolean> => {
    const isEmpty = this.IsEmpty(element);
    const hasMinimumTwoCharacters = this.IsMinimumTwoCharacterLength(element);
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