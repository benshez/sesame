import { RecipeUserId } from "supertokens-node";

export interface IBaseRequest {
  tenantId: string;
  userId: string;
  recipeUserId?: RecipeUserId;
}