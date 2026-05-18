import EmailVerification from "supertokens-node/recipe/emailverification";
import { IEmailRequest } from "./IEmailRequest";

export interface IEmailService {
  SendVerificationEmail(request: IEmailRequest): Promise<{
    status: "OK";
  } | {
    status: "EMAIL_ALREADY_VERIFIED_ERROR";
  }> 
  VerifyEmail(request: IEmailRequest): Promise<Promise<{
    status: "OK";
    user: EmailVerification.UserEmailInfo;
  } | {
    status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
  }>>;
  CreateEmailVerificationToken(request: IEmailRequest): Promise<{
    status: "OK";
    token: string;
  } | {
    status: "EMAIL_ALREADY_VERIFIED_ERROR";
  }>
  UnVerifyEmail(request: IEmailRequest): Promise<{
    status: string;
  }>
}