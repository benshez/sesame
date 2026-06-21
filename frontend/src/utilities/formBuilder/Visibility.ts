import type { IElement } from "@/interfaces/formBuilder";

export class Visibility {

  private Element: IElement = {} as IElement;
  
  constructor() {
    //this.Element = Element;
    //console.log(this.Element)
  }

  IsVisible = async (): Promise<boolean> => {
    return true;
  }


}