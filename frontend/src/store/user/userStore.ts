import { defineStore } from "pinia";
import Session from "supertokens-web-js/recipe/session";
import { ApiClient } from "@/plugins";
import type { IUserInfo, IUserMetaData } from "@/interfaces";

const apiClient = new ApiClient();

export const useUserStore = defineStore("user", {
  state: () => ({
    UserInfoState: {} as IUserInfo,
    UserMetaDataState: {} as IUserMetaData
  }),

  actions: {
    async GetAccessToken() {
      return await Session.getAccessTokenPayloadSecurely();
    },

    async GetUserId() {
      return await Session.getUserId();
    },

    async GetUserInfo() {
      const user = await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .users()
        .userInfo(await this.GetUserId())

      Object.assign(this.$state.UserInfoState, user);

      return this.$state.UserInfoState;
    },

    async SaveUserMetaData(userInfo: IUserMetaData) {
      return await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .users()
        .updateUserMetadata(userInfo);
    },

    async GetUserMetaData() {
      const response: any = await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .users()
        .getUserMetadata(await this.GetUserId());

      Object.assign(this.$state.UserMetaDataState, response.metadata);

      return this.$state.UserMetaDataState;
    },

    async SendVerificationEmail() {
      const user = await this.GetUserInfo();

      const response = await apiClient
        .setBearerAuth(await this.GetAccessToken())
        .email()
        .sendVerificationEmail({
          "email": this.$state.UserInfoState.emails.at(0)?.toString() || ""
        });
    }
  },
  getters: {
    UserInfo: (state) => state.UserInfoState,
    UserMetaData: (state) => state.UserMetaDataState
  }
})