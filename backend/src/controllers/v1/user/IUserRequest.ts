import { RecipeUserId } from "supertokens-node";
import { IBaseRequest } from "../";
import { IUserInfo, IUser, IUserMetaData } from "../../../../../shared/interfaces";

export interface IUserRequest {
  baseRequest: IBaseRequest;
  password?: string;
  newPassword?: string;
  email?: string;
  newEmail?: string;
  UpdateObject?: {
    recipeUserId: RecipeUserId;
    applyPasswordPolicy: boolean,
    tenantIdForPasswordPolicy: string;
  }, 
  userInfo?: IUserInfo;
  roleId?: string;
  user: IUser;
  metadata?: IUserMetaData;
}