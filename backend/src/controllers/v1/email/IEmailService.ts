import EmailVerification from "supertokens-node/recipe/emailverification";
import supertokens from "supertokens-node";

export interface IEmailService {
  SendVerificationEmail(userId: string, recipeUserId: supertokens.RecipeUserId, tenantId: string, email: string): Promise<{
    status: "OK";
  } | {
    status: "EMAIL_ALREADY_VERIFIED_ERROR";
  }> 
  VerifyEmail(tenantId: string, recipeUserId: supertokens.RecipeUserId): Promise<Promise<{
    status: "OK";
    user: EmailVerification.UserEmailInfo;
  } | {
    status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
  }>>;
  CreateEmailVerificationToken(tenantId: string, recipeUserId: supertokens.RecipeUserId): Promise<{
    status: "OK";
    token: string;
  } | {
    status: "EMAIL_ALREADY_VERIFIED_ERROR";
  }>
  UnVerifyEmail(recipeUserId: supertokens.RecipeUserId): Promise<{
    status: string;
  }>
}