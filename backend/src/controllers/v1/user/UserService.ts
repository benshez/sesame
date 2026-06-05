import supertokens, { User, RecipeUserId } from "supertokens-node";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import UserRoles from "supertokens-node/recipe/userroles";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { IUserService } from "../";
import { IUserRequest } from "../";
import { IUserInfo } from "../../../../../shared/interfaces";

export class UserService implements IUserService {
  GetUserInfo = async (request: IUserRequest): Promise<User | undefined> => {
    const response = await supertokens.getUser(request.baseRequest.userId);

    return response;
  }

  GetUseMetaData = async (request: IUserRequest): Promise<{
    status: "OK";
    metadata: unknown;
  }> => {
    const response = await UserMetadata.getUserMetadata(request.baseRequest.userId);

    return response;
  }

  DeleteUser = async (request: IUserRequest): Promise<{
    status: "OK";
  } | {
    status: "USER_DOES_NOT_EXIST_ERROR";
  }> => {
    const response = await supertokens.deleteUser(request.baseRequest.userId);

    if (response === undefined) {
      return {
        status: "USER_DOES_NOT_EXIST_ERROR"
      };
    }

    return {
      status: "OK"
    };
  }

  UpdateUserMetadata = async (request: IUserRequest): Promise<{
    status: "OK";
    metadata: UserMetadata.JSONObject;
  }> => {
    const response = await UserMetadata.updateUserMetadata(request.baseRequest.userId, request.userInfo as IUserInfo);

    return response;
  }

  AddRoleToUser = async (request: IUserRequest): Promise<{
    status: "OK";
    didUserAlreadyHaveRole: boolean;
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }> => {
    const response = await UserRoles.addRoleToUser(request.baseRequest.tenantId, request.baseRequest.userId, request.roleId as string);

    return response;
  }

  RemoveRoleFromUser = async (request: IUserRequest): Promise<{
    status: "OK";
    didUserHaveRole: boolean;
  } | {
    status: "UNKNOWN_ROLE_ERROR";
  }> => {
    const response = await UserRoles.removeUserRole(request.baseRequest.tenantId, request.baseRequest.userId, request.roleId as string);

    return response;
  } 

  GetUserRoles = async (request: IUserRequest): Promise<{
    status: "OK";
    roles: Array<string>;
  }> => {
    const response = await UserRoles.getRolesForUser(request.baseRequest.tenantId, request.baseRequest.userId);

    return response;
  }

  SignUp = async (request: IUserRequest): Promise<{ status: "OK"; user: User; recipeUserId: RecipeUserId; } | { status: "EMAIL_ALREADY_EXISTS_ERROR"; }> => {
    const response = await EmailPassword.signUp(request.baseRequest.tenantId, request.user.email as string, request.user.password as string)

    return response;
  }

  SignIn = async (request: IUserRequest): Promise<{
    status: "OK";
    user: User;
    recipeUserId: RecipeUserId;
  } | {
    status: "WRONG_CREDENTIALS_ERROR";
  }> => {
    const response = await EmailPassword.signIn(request.baseRequest.tenantId, request.user.email as string, request.user.password as string)

    return response;
  }

  UpdateUserPasswordAndEmail = async (request: IUserRequest): Promise<{
    status: string;
    metadata: string;
  }> => {
    const UpdatedObject = Object.assign({}, request.UpdateObject);

    if (request.password !== "" && request.newPassword !== "") {
      const loginMethod = await this.GetUserLoginMetod(request);

      if (loginMethod === undefined) {
        return {
          status: "ERROR",
          metadata: "Not Updated!"
        }
      }

      const email = loginMethod.email!;
      const isPasswordValid = await this.IsValidPassword(request.baseRequest.tenantId, email, request?.password as string);

      if (!isPasswordValid) {
        return {
          status: "ERROR",
          metadata: "Not Updated!"
        }
      }

      Object.assign(UpdatedObject, { password: request.newPassword });
    }

    if (request.newEmail !== "" && this.IsValidEmail(request.newEmail as string)) {
      Object.assign(UpdatedObject, { email: request.newEmail });
    }

    const response = await EmailPassword.updateEmailOrPassword(UpdatedObject);

    if (response.status === "PASSWORD_POLICY_VIOLATED_ERROR") {
      return {
        status: "ERROR",
        metadata: "Not Updated!"
      }
    }

    return {
      status: "OK",
      metadata: "Password and or email updated."
    }
  }

  GetUserLoginMetod = async (request: IUserRequest) => {
    const userInfo = await supertokens.getUser(request.baseRequest.userId);

    if (userInfo === undefined) {
      throw new Error("Should never come here");
    }

    const loginMethod = userInfo.loginMethods.find((lM) => lM.recipeUserId.getAsString() === request.baseRequest.recipeUserId?.getAsString() && lM.recipeId === "emailpassword");

    return loginMethod;
  }

  IsValidEmail = (email: string): boolean => {
    const regexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    return regexp.test(email);
  }

  IsValidPassword = async (tenantId: string, email: string, password: string) => {
    const isPasswordValid = await EmailPassword.verifyCredentials(tenantId, email, password);

    return isPasswordValid.status !== "OK"
  }
}