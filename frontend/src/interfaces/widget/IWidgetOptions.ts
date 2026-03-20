import type { IUser, IPage } from "@/interfaces";

export interface IWidgetOptions {
  userId?: string| undefined;
  container?: string | undefined;
  userInfo?: IUser | undefined;
  pages?: Array<IPage> | undefined;
}