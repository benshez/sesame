import { User } from "supertokens-node";
import { RecipeUserId } from "supertokens-node";
import { IUserRequest } from "../";
import UserMetadata from "supertokens-node/recipe/usermetadata";

export interface IUserService {
  GetUserInfo(request: IUserRequest): Promise<User | undefined>;
  GetUseMetaData(request: IUserRequest): Promise<{
    status: "OK";
    metadata: unknown;
  }>;
  UpdateUserMetadata(request: IUserRequest): Promise<{
    status: "OK";
    metadata: UserMetadata.JSONObject;
  }>;
  AddRoleToUser(request: IUserRequest): Promise<{
    status: "OK";
    didUserAlreadyHaveRole: boolean;
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }>
  RemoveRoleFromUser(request: IUserRequest): Promise<{
    status: "OK";
    didUserHaveRole: boolean;
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }>;
  GetUserRoles(request: IUserRequest): Promise<{
    status: "OK";
    roles: Array<string>;
  }>;
  UpdateUserPasswordAndEmail(request: IUserRequest): Promise<{
    status: string;
    metadata: string;
  }>;
  SignUp(request: IUserRequest): Promise<{ status: "OK"; user: User; recipeUserId: RecipeUserId; } | { status: "EMAIL_ALREADY_EXISTS_ERROR"; }>;
  SignIn(request: IUserRequest): Promise<{
    status: "OK";
    user: User;
    recipeUserId: RecipeUserId;
  } | {
    status: "WRONG_CREDENTIALS_ERROR";
  }>;
  DeleteUser(request: IUserRequest): Promise<{
    status: "OK";
  } | {
    status: "USER_DOES_NOT_EXIST_ERROR";
  }>;
}