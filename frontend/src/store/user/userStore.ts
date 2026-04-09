import Session from "supertokens-web-js/recipe/session";
import { ApiClient } from "@/plugins";
import { useFormStore } from "@/store";

export const useUserStore = () => {
  const apiClient = new ApiClient();
  const formStore = useFormStore();

  let UserInfo = {
    emails: []
  };

  let MetaData = {
    metadata: {
      name: ""
    }
  };

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

    return Object.assign(UserInfo, user);;
  }

  const SaveUserMetaData = async () => {
    const metadata = {
      "name": formStore.getElement("name").value
    }
    const upd = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .updateUserMetadata(metadata);
  }

  const GetUserMetaData = async () => {
    MetaData = Object.assign(MetaData, await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .getUserMetadata(await GetUserId()));

    formStore.updateElementState("name", { key: "value", value: MetaData?.metadata?.name });
  }

  const SendVerificationEmail = async () => {
    const user = await GetUserInfo();

    const sendVerificationEmailResponse = await apiClient
      .setBearerAuth(await GetAccessToken())
      .email()
      .sendVerificationEmail({
        "email": UserInfo.emails[0]
      });
  }

  return {
    GetUserInfo,
    SaveUserMetaData,
    GetUserMetaData,
    SendVerificationEmail
  }
}