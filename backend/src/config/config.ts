import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import MultiFactorAuth from "supertokens-node/recipe/multifactorauth";
import EmailVerification from "supertokens-node/recipe/emailverification";
import WebAuthN from "supertokens-node/recipe/webauthn";
import TOTP from "supertokens-node/recipe/totp";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { SMTPService } from "supertokens-node/recipe/emailverification/emaildelivery";
import type { TypeInput } from "supertokens-node/types";
import { useBackendConfig } from "./useBackendConfig";

const backendConfig = useBackendConfig();
const smtpSettings = backendConfig.GetSMTPConfig();

export const SuperTokensConfig: TypeInput = {
  supertokens: {
    connectionURI: `${process.env.SUPERTOKENS_CONNECTION_URL}`,
  },
  appInfo: {
    appName: `${process.env.APP_NAME}`,
    apiDomain: backendConfig.GetApiDomain(),
    websiteDomain: backendConfig.GetWebsiteDomain(),
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: process.env.GOOGLE_CLIENT_ID as string,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "github",
              clients: [
                {
                  clientId: process.env.GITHUB_CLIENT_ID as string,
                  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,

                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "twitter",
              clients: [
                {
                  clientId: process.env.TWITTER_CLIENT_ID as string,
                  clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
                },
              ],
            },
          }
        ],
      },
    }),
    Passwordless.init({
      contactMethod: "EMAIL",
      flowType: "USER_INPUT_CODE_AND_MAGIC_LINK"
    }),
    Dashboard.init(),
    UserRoles.init(),
    Multitenancy.init({
      override: {
        functions: (oI) => {
          return {
            ...oI,
          };
        },
      },
    }),
    MultiFactorAuth.init({
      firstFactors: ["thirdparty", "emailpassword"]
    }),
    TOTP.init(),
    EmailVerification.init({
      mode: "REQUIRED",
      emailDelivery: {
        service: new SMTPService({ smtpSettings }),
      },
    }),
    WebAuthN.init(),
    UserMetadata.init(),
    Session.init()
  ],
};