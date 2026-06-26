import { useRoute } from "vue-router";
import type { IBasePage, IElement, IKeyValue, IStep, IPage, IPages } from "@/interfaces/formBuilder";
import { Visibility } from "@/utilities/formBuilder/Visibility";
import { Validation } from "./Validation";
import { ApiClient } from "@/plugins/client/ApiClient";
import { useUserStore } from "@/store/user/useUserStore";

export class BaseFormBuilder<TVisibility = null, TValidation = null, TStep = null, TElement = null> implements IBasePage<TVisibility, TValidation, TStep, TElement> {

  public Visibility: TVisibility;
  public Validation: TValidation;
  public Pages: Array<IPage> = {} as Array<IPage>;
  public Page: IPage = {} as IPage;
  public TenantId: string = "";
  public CurrentRouteName: string = "auth";
  public Step: TStep = undefined as TStep;
  public Element: TElement = {} as TElement;
  public StepCount: number = 0;
  public IsFinalStep: boolean = false;

  constructor() {
    const UserStore = useUserStore();
    this.Visibility = new Visibility() as TVisibility;
    this.Validation = new Validation() as TValidation;
    this.TenantId = UserStore.GetTenantIdFromRoute();
    this.CurrentRouteName = "auth" //|| useRoute().name as string;
  }

  Initialise = async (): Promise<void> => {
    const apiClient = new ApiClient();
    const Json: IPages = await apiClient.formbuilder().getTenantJson("1") as unknown as IPages;

    this.Pages = Json.Pages;

    this.GetCurrentPage();
    this.GetCurrentStep();
  }

  GetCurrentPage = (): IPage => {
    this.Page = this.Pages.find(Page => Page.Name === this.CurrentRouteName) as unknown as IPage;
    this.StepCount = this.Page.Steps ? this.Page.Steps.length : 0;

    return this.Page
  }

  GetCurrentStep = (StepIndex: number = 0): IStep => {
    const Page: IPage = this.GetCurrentPage();
    const Steps: Array<IStep> = Page.Steps as unknown as Array<IStep>;
    if (StepIndex === 0) StepIndex = Page.CurrentStepIndex;

    this.IsFinalStep = (Page.CurrentStepIndex === Steps.length - 1);

    this.Step = Steps.find(Step => Step.StepIndex === StepIndex) as IStep as TStep;

    //this.Page.HasValidationErrors = true;

    return this.Step as IStep;
  }

  GetElements = (StepIndex: number = 0): Array<IElement> => {
    const Step: IStep = this.GetCurrentStep(StepIndex);

    return Step.Fieldsets?.find(Fieldset => Fieldset.Elements)?.Elements as Array<IElement>;
  }

  IsValidOrVisible = async (
    Instance: typeof this.Visibility | typeof this.Validation,
    Query: IKeyValue,
    Element: IElement,
    MatchedElement: IElement = {} as IElement
  ): Promise<boolean> => {
    const IsObject: boolean = typeof Query === "object" || false;
    const HasKeyAndValue: boolean = (Object.keys(Query.Key).length > 0 && Object.keys(Query.Value).length > 0) || false;
    const HasMatchedElement: boolean = Object.keys(MatchedElement).length > 0;

    if (IsObject && HasKeyAndValue) {
      switch (Query.Key.toString().toLowerCase()) {
        case "class":
          const Method = Reflect.get(Instance as Visibility | Validation, Query.Value);

          if (typeof Method === "function") {
            if (HasMatchedElement) {
              return await Method.call(Instance, Element, MatchedElement);
            } else {
              return await Method.call(Instance, Element);
            }
          }
          break;
        case "array":
          return true;
          break;
        default:
          return true;
          break;
      }
    }

    return true;
  }

  HandleInput = () => {

  }
}