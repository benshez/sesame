import recipeUserId from "supertokens-node/lib/build/recipeUserId";
import { IBaseRequest } from "..";

export interface IEmailRequest {
  baseRequest: IBaseRequest;
  email?: string;
  recipeUserId: recipeUserId;
}