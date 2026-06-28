import { useRoute } from "vue-router";
import type { IBasePage, IField, IKeyValue, IStep, IPage, IPages, IScorer, IFieldset } from "@/interfaces/formBuilder";
import { Visibility } from "@/utilities/formBuilder/Visibility";
import { Validation } from "@/utilities/formBuilder/Validation";
import { Scorer } from "@/utilities/formBuilder/Scorer";
import { ApiClient } from "@/plugins/client/ApiClient";
import { useUserStore } from "@/store/user/useUserStore";

export class BaseFormBuilder<TVisibility = null, TValidation = null, TScorer = null, TStep = null, TField = null> implements IBasePage<TVisibility, TValidation, TScorer, TStep, TField> {

  public Visibility: TVisibility;
  public Validation: TValidation;
  public Scorer: typeof Scorer | TScorer;
  public Pages: IPages = {} as IPages;
  public TenantId: string = "";
  public CurrentRouteName: string = "auth";
  public Step: TStep = undefined as TStep;
  public Field: TField = {} as TField;
  public StepCount: number = 0;
  public IsFinalStep: boolean = false;

  constructor(
    visibility = null,
    validation = null,
    scorer: typeof this.Scorer | null,
    step = null,
    field = null
  ) {
    const UserStore = useUserStore();

    this.Visibility = visibility || new Visibility() as TVisibility;
    this.Validation = validation || new Validation() as TValidation;
    this.Scorer = scorer || new Scorer() as TScorer;
    if (step) this.Step = step
    if (field) this.Field = field;
    this.TenantId = UserStore.GetTenantIdFromRoute();
    this.CurrentRouteName = "auth" //|| useRoute().name as string;
  }

  Initialise = async (): Promise<void> => {
    const apiClient = new ApiClient();
    const Json: IPages = await apiClient.formbuilder().getTenantJson("1") as unknown as IPages;

    this.Pages = Json;

    this.SetCurrentPage();
    //this.GetCurrentStep();
  }

  SetCurrentPage = (): IPage => {
    this.Pages.Page = this.Pages.Pages.find(Page => Page.Name === this.CurrentRouteName) as unknown as IPage;
    this.StepCount = this.Pages.Page.Steps ? this.Pages.Page.Steps.length : 0;

    return this.Pages.Page
  }

  GetCurrentStep = (StepIndex: number = 0): IStep => {
    const Steps: Array<IStep> = this.Pages.Page.Steps as unknown as Array<IStep>;
    if (StepIndex === 0) StepIndex = this.Pages.Page.CurrentStepIndex;

    this.IsFinalStep = (this.Pages.Page.CurrentStepIndex === Steps.length - 1);

    this.Step = Steps.find(Step => Step.StepIndex === StepIndex) as IStep as TStep;

    return this.Step as IStep;
  }

  GetFields = (StepIndex: number = 0): Array<IField> => {
    const Step: IStep = this.GetCurrentStep(StepIndex);
    let Fields: Array<IField> = [];

    Step.Fieldsets?.forEach((Fieldset: IFieldset) => {
      Fieldset.Fields?.forEach(Field => {
        Fields.push(Field)
      })

    })

    return Fields;
  }

  GetScore = async (Steps: Array<IStep>): Promise<number> => {
    let Score: number = 0;

    if (this.Pages.Page.Steps) {
      for (const Step of this.Pages.Page.Steps) {
        if (Step.Fieldsets) {
          for (const FieldSet of Step.Fieldsets) {
            if (FieldSet.Fields) {
              for (const Field of FieldSet.Fields) {
                const Instance = this.Scorer as Scorer;
                const Method = Reflect.get(Instance, "GetScore");
                const Result = await Method.call(Instance, Field);
                Score = Score + Result;
              }
            }
          }
        }
      }
    }

    return Score;
  }

  IsValid = async (Field: IField, MatchedField: IField = {} as IField): Promise<boolean> => {
    let IsValid: boolean = true;
    const HasMatchedField: boolean = Object.keys(MatchedField).length > 0;

    if (Field) {
      const Instance = this.Validation as Validation;
      const Method = Reflect.get(Instance, "IsValid");
      if (HasMatchedField) {
        IsValid = await Method.call(Instance, Field, MatchedField);
      } else {
        IsValid = await Method.call(Instance, Field);
      }

      return IsValid;
    }

    return IsValid;
  }

  IsVisible = async (Field: IField): Promise<boolean> => {
    let IsVisible: boolean = true;

    if (Field) {
      const Instance = this.Visibility as Visibility;
      const Method = Reflect.get(Instance, "IsVisible");
      const IsVisible = await Method.call(Instance, Field);
      return IsVisible;
    }

    return IsVisible;
  }

  HandleInput = () => {

  }
}