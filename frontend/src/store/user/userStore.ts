import { defineStore } from "pinia";
import { ref } from "vue";
import Session from "supertokens-web-js/recipe/session";
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

  const GetUserInfo = async () => {
    const user = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .userInfo(await GetUserId())

    Object.assign(userState.value.UserInfo, user);

    return userState.value.UserInfo;
  }

  const SaveUserMetaData = async (userInfo: IUserMetaData) => {
    return await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .updateUserMetadata(userInfo);
  }

  const GetUserMetaData = async () => {
    const response: any = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .getUserMetadata(await GetUserId());

    Object.assign(userState.value.UserMetaData, response.metadata);

    return userState.value.UserMetaData;
  }

  const SendVerificationEmail = async () => {
    const user = await GetUserInfo();

    const response = await apiClient
      .setBearerAuth(await GetAccessToken())
      .email()
      .sendVerificationEmail({
        "email": userState.value.UserInfo.emails.at(0)?.toString() || ""
      });
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