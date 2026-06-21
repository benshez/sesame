import type { IElement } from "@/interfaces/formBuilder";

export class Validation {

  private Element: IElement = {} as IElement;

  constructor() {

  }

  IsValid = async (): Promise<boolean> => {
    console.log(this.Element)
    return false;
  }
}