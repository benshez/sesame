import { useRoute } from "vue-router";
import type { IBasePage, IElement, IKeyValue, IPage, IPages } from "@/interfaces/formBuilder";
import type { Visibility } from "@/utilities/formBuilder/Visibility";
import type { Validation } from "./Validation";
import { ApiClient } from "@/plugins/client/ApiClient";

export class BaseFormBuilder<TVisibility, TValidation> implements IBasePage<TVisibility, TValidation> {

  public Visibility: TVisibility;
  public Validation: TValidation;
  public Pages: Array<IPage> = {} as Array<IPage>;
  public TenantId: string = "";
  public CurrentRouteName: string = "auth";

  constructor(
    Visibility: TVisibility,
    Validation: TValidation,
    TenantId: string
  ) {
    this.Visibility = Visibility;
    this.Validation = Validation;
    this.TenantId = TenantId;
    this.CurrentRouteName = "auth" //|| useRoute().name as string;
  }

  Initialise = async (): Promise<void> => {
    const apiClient = new ApiClient();
    const Json: IPages = await apiClient.formbuilder().getTenantJson("1") as unknown as IPages;

    this.Pages = Json.Pages;
  }

  IsValidOrVisible = async (Instance: typeof this.Visibility | typeof this.Validation, Query: IKeyValue, element: IElement): Promise<boolean> => {
    const IsObject: boolean = typeof Query === "object" || false;
    const HasKeyAndValue: boolean = (Object.keys(Query.Key).length > 0 && Object.keys(Query.Value).length > 0) || false;

    if (IsObject && HasKeyAndValue) {
      switch (Query.Key.toString().toLowerCase()) {
        case "class":
          const Method = Reflect.get(Instance as Visibility | Validation, Query.Value);

          if (typeof Method === "function") {
            return await Method.call(Instance, element);
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