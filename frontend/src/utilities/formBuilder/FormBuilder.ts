import { BaseFormBuilder } from "@/utilities/formBuilder/BaseFormBuilder";
import type {
  IPage,
  IStep,
  IElement,
  IKeyValue,
  IValidation,
  IVisibility
} from "@/interfaces/formBuilder";

export class FormBuilder extends BaseFormBuilder<IVisibility, IValidation> {

  public TenantId: string = "";

  constructor(
    Visibility: IVisibility,
    Validation: IValidation,
    TenantId: string) {
    super(Visibility, Validation, TenantId);

    this.TenantId = TenantId;
  }

  GetCurrentPage = (): IPage => {
    return this.Pages.find(Page => Page.Name === this.CurrentRouteName) as unknown as IPage;
  }

  GetCurrentStep = (StepIndex: number = 0): IStep => {
    const Page: IPage = this.GetCurrentPage();
    const Steps: Array<IStep> = Page.Steps as unknown as Array<IStep>;
    if(StepIndex === 0) StepIndex = Page.CurrentStepIndex

    return Steps.find(Step => Step.StepIndex === StepIndex) as unknown as IStep;
  }

  GetElements = (): Array<IElement> => {
    const Step: IStep = this.GetCurrentStep();

    return Step.Elements as Array<IElement>;
  }

  GetElement = (Id: string): IElement => {
    const Elements: Array<IElement> = this.GetElements();

    return Elements.find(Element => Element.Id === Id) as IElement;
  }

  HandleIsVisible = async (Element: IElement): Promise<boolean> => {
    const IsVisible: boolean = await this.IsValidOrVisible(this.Visibility, Element.IsVisibleIf as IKeyValue);

    return IsVisible;
  }

  HandleIsValid = async (Element: IElement): Promise<boolean> => {
    const IsValid: boolean = await this.IsValidOrVisible(this.Validation, Element.IsValidIf as IKeyValue);

    return IsValid;
  }
}