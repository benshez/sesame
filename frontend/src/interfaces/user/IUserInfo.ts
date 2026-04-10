
import type { ILoginMethods } from "@/interfaces";

export type IUserInfo = {
  id: string,
  isPrimaryUser: boolean,
  tenantIds: Array<string>,
  emails: Array<string>,
  phoneNumbers: Array<string>,
  thirdParty: Array<string>,
  webauthn: {
    credentialIds: Array<string>,
  },
  timeJoined: number,
  loginMethods: ILoginMethods
}