import { UserEmailInfo } from "supertokens-node/recipe/emailverification";
import EmailVerification from "supertokens-node/recipe/emailverification";
import supertokens from "supertokens-node";
import { IEmailService } from "../index";

export class EmailService implements IEmailService {
  async SendVerificationEmail(userId: string, recipeUserId: supertokens.RecipeUserId, tenantId: string, email: string): Promise<{ status: "OK"; } | { status: "EMAIL_ALREADY_VERIFIED_ERROR"; }> {
    const response = await EmailVerification.sendEmailVerificationEmail(tenantId, userId, recipeUserId, email);

    if (response.status === "OK") {
      return { "status": "OK" };
    }

    return { "status": "EMAIL_ALREADY_VERIFIED_ERROR" };
  }

  async VerifyEmail(tenantId: string, recipeUserId: supertokens.RecipeUserId): Promise<Promise<{ status: "OK"; user: UserEmailInfo; } | { status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"; }>> {
    const token = await this.CreateEmailVerificationToken(tenantId, recipeUserId);

    if (token.status === "OK") {
      const response = await EmailVerification.verifyEmailUsingToken(tenantId, token?.token || "", true);

      if (response.status === "OK") {
        return {
          "status": "OK",
          "user": response.user
        }
      }
    }

    return { "status": "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" };
  }

  async CreateEmailVerificationToken(tenantId: string, recipeUserId: supertokens.RecipeUserId): Promise<{ status: "OK"; token: string; } | { status: "EMAIL_ALREADY_VERIFIED_ERROR"; }> {
    const response = await EmailVerification.createEmailVerificationToken(tenantId, recipeUserId);

    if (response.status === "OK") {
      return {
        "status": "OK",
        "token": response.token
      };
    }

    return { "status": "EMAIL_ALREADY_VERIFIED_ERROR" };
  }

  async UnVerifyEmail(recipeUserId: supertokens.RecipeUserId): Promise<{ status: string; }> {
    const response = await EmailVerification.unverifyEmail(recipeUserId);

    if (response.status === "OK") {
      return {
        "status": "OK"
      }
    }

    return { "status": "BAD" };
  }
}