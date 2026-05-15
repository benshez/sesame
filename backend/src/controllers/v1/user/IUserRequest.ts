import { RecipeUserId } from "supertokens-node";
import { IBaseRequest } from "../";
import { IUserInfo } from "../../../../../shared/interfaces";

export interface IUserRequest {
  baseRequest: IBaseRequest
  password?: string;
  newPassword?: string;
  newEmail?: string;
  UpdateObject?: {
    recipeUserId: RecipeUserId;
    applyPasswordPolicy: boolean,
    tenantIdForPasswordPolicy: string;
  }, 
  userInfo?: IUserInfo;
  roleId?: string
}