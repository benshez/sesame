import { IBaseRequest } from "..";
import { ITenant } from "../../../../../shared/interfaces";

export interface ITenantRequest {
  baseRequest: IBaseRequest;
  tenant: ITenant;
}