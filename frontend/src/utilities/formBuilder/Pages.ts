import { useRoute } from "vue-router";
import type { IPages, IPage, IStep, IElement, IKeyValue, IValidation, IVisibility } from "@/interfaces/formBuilder";
import { BasePages } from "@/utilities/formBuilder/BasePages";

export class Pages extends BasePages<IVisibility, IValidation> {

  public CurrentRouteName: string = "";
  public TenantId: string = "";


  constructor(
    Visibility: IVisibility,
    Validation: IValidation,
    TenantId: string) {
    super(Visibility, Validation, TenantId);

    this.CurrentRouteName = "auth";//useRoute().name as string;
    this.TenantId = TenantId;
  }

  GetPage = (): IPage => {
    return this.Pages.find(Page => Page.Name === this.CurrentRouteName) as unknown as IPage;
  }

  GetStep = (): IStep => {
    const Page: IPage = this.GetPage();
    const Steps: Array<IStep> = Page.Steps as unknown as Array<IStep>;

    return Steps.find(Step => Step.StepIndex === Page.CurrentStepIndex) as unknown as IStep;
  }

  GetElements = (): Array<IElement> => {
    const Step: IStep = this.GetStep();

    return Step.Elements as Array<IElement>;
  }

  GetElement = (Id: string): IElement => {
    const Elements: Array<IElement> = this.GetElements();

    return Elements.find(Element => Element.Id === Id) as IElement;
  }

  HandleIsVisible = async (Element: IElement): Promise<boolean> => {
    return await this.IsValidOrVisible(this.Visibility, Element.IsVisibleIf as IKeyValue);
  }

  HandleIsValid = async (Element: IElement): Promise<boolean> => {
    return await this.IsValidOrVisible(this.Validation, Element.IsValidIf as IKeyValue);
  }
}