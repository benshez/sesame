import { IBaseRequest } from "..";

export interface IEmailRequest {
  baseRequest: IBaseRequest;
  email?: string;
}