import type { IBasePage, IKeyValue, IPage } from "@/interfaces/formBuilder";
import type { Visibility } from "@/utilities/formBuilder/Visibility";
import type { Validation } from "./Validation";

export class BasePages<TVisibility, TValidation> implements IBasePage<TVisibility, TValidation> {

  public Visibility: TVisibility;
  public Validation: TValidation;
  public Pages: Array<IPage> = {} as Array<IPage>;
  public TenantId: string = "";

  constructor(
    Visibility: TVisibility,
    Validation: TValidation,
    TenantId: string
  ) {
    this.Visibility = Visibility;
    this.Validation = Validation;
    this.TenantId = TenantId;
  }

  Initialise = async (): Promise<void> => {
    const Json: { Pages: Array<IPage>, default: {} } = await import(/* webpackChunkName: `GetPagesForTenant${this.TenantId}` */ `@/utilities/formBuilder/data/${this.TenantId}.json`);

    this.Pages = Json.Pages;
  }

  IsValidOrVisible = async (Instance: typeof this.Visibility | typeof this.Validation, Query: IKeyValue): Promise<boolean> => {
    const IsObject: boolean = typeof Query === "object" || false;
    const HasKey: boolean = Object.keys(Query.Key).length > 0 || false;

    if (IsObject && HasKey) {
      switch (Query.Key.toString().toLowerCase()) {
        case "class":
          if (Query.Value) {
            const Method = Reflect.get(Instance as Visibility | Validation, Query.Value);

            if (typeof Method === "function") {
              return await Method.call(Instance);
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
}