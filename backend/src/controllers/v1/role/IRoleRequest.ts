import { IBaseRequest } from "..";

export interface IRoleRequest {
  baseRequest: IBaseRequest;
  roleId?: string;
  permission?: string;
  permissions?: Array<string>;
}