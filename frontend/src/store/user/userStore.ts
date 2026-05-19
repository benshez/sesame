import { defineStore } from "pinia";
import { ref } from "vue";
import Session from "supertokens-web-js/recipe/session";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";
import { ApiClient } from "@/plugins";
import type { IUserInfo, IUserMetaData } from "@/interfaces";


export const useUserStore = defineStore("user", () => {
  const apiClient = new ApiClient();
  const userState = ref({
    UserInfo: {} as IUserInfo,
    UserMetaData: {} as IUserMetaData
  });

  const GetAccessToken = async () => {
    return await Session.getAccessTokenPayloadSecurely();
  }

  const GetUserId = async () => {
    return await Session.getUserId();
  }

  const GetUserInfo = async (userId: string) => {
    userState.value.UserInfo = {} as IUserInfo;

    const user = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .userInfo(userId)

    Object.assign(userState.value.UserInfo, user);

    return user;
  }

  const SaveUserMetaData = async (userInfo: IUserMetaData) => {
    return await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .updateUserMetadata(userInfo);
  }

  const GetUserMetaData = async (userId: string) => {
    userState.value.UserMetaData = {} as IUserMetaData;
    
    const response: any = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .getUserMetadata(userId);

    Object.assign(userState.value.UserMetaData, response.metadata);

    return response.metadata;
  }

  const SendVerificationEmail = async (userId: string, email: string) => {
    //const user = await GetUserInfo(userId);

    const response = await apiClient
      .setBearerAuth(await GetAccessToken())
      .email()
      .sendVerificationEmail({
        "email": email, 
        "userId": userId,
      });
  }

  const UserHasClaim = async (claimId: string): Promise<boolean> => {
    if (await Session.doesSessionExist()) {
      const roles = await Session.getClaimValue({claim: UserRoleClaim});

      return roles !== undefined && roles.includes(claimId);
    }

    return false;
  }

  return {
    userState,
    GetUserInfo,
    GetUserMetaData,
    SaveUserMetaData,
    SendVerificationEmail,
    GetAccessToken,
    GetUserId
  }
})