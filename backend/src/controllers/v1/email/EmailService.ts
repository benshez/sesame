import { UserEmailInfo } from "supertokens-node/recipe/emailverification";
import EmailVerification from "supertokens-node/recipe/emailverification";
import { RecipeUserId } from "supertokens-node";
import { IEmailService, IEmailRequest } from "./index";

export class EmailService implements IEmailService {
  async SendVerificationEmail(request: IEmailRequest): Promise<{ status: "OK"; } | { status: "EMAIL_ALREADY_VERIFIED_ERROR"; }> {
    const response = await EmailVerification.sendEmailVerificationEmail(request.baseRequest.tenantId, request.baseRequest.userId, request.baseRequest.recipeUserId as RecipeUserId, request.email);

    if (response.status === "OK") {
      return { "status": "OK" };
    }

    return { "status": "EMAIL_ALREADY_VERIFIED_ERROR" };
  }

  async VerifyEmail(request: IEmailRequest): Promise<Promise<{ status: "OK"; user: UserEmailInfo; } | { status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"; }>> {
    const token = await this.CreateEmailVerificationToken(request);

    if (token.status === "OK") {
      const response = await EmailVerification.verifyEmailUsingToken(request.baseRequest.tenantId, token?.token || "", true);

      if (response.status === "OK") {
        return {
          "status": "OK",
          "user": response.user
        }
      }
    }

    return { "status": "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" };
  }

  async CreateEmailVerificationToken(request: IEmailRequest): Promise<{ status: "OK"; token: string; } | { status: "EMAIL_ALREADY_VERIFIED_ERROR"; }> {
    const response = await EmailVerification.createEmailVerificationToken(request.baseRequest.tenantId, request.baseRequest.recipeUserId as RecipeUserId);

    if (response.status === "OK") {
      return {
        "status": "OK",
        "token": response.token
      };
    }

    return { "status": "EMAIL_ALREADY_VERIFIED_ERROR" };
  }

  async UnVerifyEmail(request: IEmailRequest): Promise<{ status: string; }> {
    const response = await EmailVerification.unverifyEmail(request.baseRequest.recipeUserId as RecipeUserId);

    if (response.status === "OK") {
      return {
        "status": "OK"
      }
    }

    return { "status": "BAD" };
  }
}