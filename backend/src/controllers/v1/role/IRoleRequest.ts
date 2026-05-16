import { IBaseRequest } from "..";
import { IRole } from "../../../../../shared/interfaces";

export interface IRoleRequest {
  baseRequest: IBaseRequest;
  role?: IRole;
}