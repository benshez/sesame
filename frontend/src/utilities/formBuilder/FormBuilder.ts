import { BaseFormBuilder } from "@/utilities/formBuilder/BaseFormBuilder";
import type {
  IPage,
  IStep,
  IElement,
  IKeyValue,
  IVisibility,
  IValidation,
  IScorer
} from "@/interfaces/formBuilder";

export class FormBuilder extends BaseFormBuilder<IVisibility, IValidation, IScorer, IStep, IElement> {

  constructor(
    visibility = null,
    validation = null,
    scorer = null,
    step = null,
    element = null
  ) {
    super(visibility, validation, scorer, step, element);
  }

  GetElement = (Id: string, StepIndex: number): IElement => {
    const Elements: Array<IElement> = this.GetElements(StepIndex);

    this.Element = Elements.find(Element => Element.Id === Id) as IElement;

    return this.Element;
  }

  HandleIsVisible = async (Element: IElement): Promise<boolean> => {
    Element.IsVisible = await this.IsValidOrVisible(this.Visibility, Element.IsVisibleIf as IKeyValue, Element);

    return Element.IsVisible;
  }

  HandleIsValid = async (Element: IElement, MatchedElement: IElement = {} as IElement): Promise<boolean> => {
    const HasMatchedElement: boolean = Object.keys(MatchedElement).length > 0;

    if (HasMatchedElement) {
      Element.IsValid = await this.IsValidOrVisible(this.Validation, Element.IsValidIf as IKeyValue, Element, MatchedElement);
    } else {
      Element.IsValid = await this.IsValidOrVisible(this.Validation, Element.IsValidIf as IKeyValue, Element);
    }

    return Element.IsValid;
  }
}