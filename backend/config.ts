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
import { SMTPService } from "supertokens-node/recipe/emailverification/emaildelivery";
import type { TypeInput } from "supertokens-node/types";
import * as dotenvx from "@dotenvx/dotenvx";

const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenvx.config({ path: ['./environment/.env',`./environment/${envFile}`] });

const smtpSettings = {
  host: process.env.SMTP_HOST as string,
  port: process.env.SMTP_PORT as unknown as number,
  secure: true as boolean,
  authUsername: process.env.SMTP_USER as string,
  password: process.env.SMTP_USER_PASSWORD as string,
  from: {
    name: process.env.APP_TENANT_NAME as string,
    email: process.env.SMTP_NO_REPLY_EMAIL as string,
  },
}


export function getApiDomain() {
  const apiPort = process.env.API_PORT;
  const apiUrl = process.env.API_URL;

  if (!apiPort) throw new Error('API_PORT is missing');
  if (!apiUrl) throw new Error('API_URL is missing');

  return `${apiUrl}:${apiPort}`;
}

export function getWebsiteDomain() {
  const websitePort = process.env.WEB_SITE_PORT;
  const websiteUrl = process.env.WEB_SITE_URL;

  if (!websitePort) throw new Error('WEB_SITE_PORT is missing');
  if (!websiteUrl) throw new Error('WEB_SITE_URL is missing');

  return `${websiteUrl}:${websitePort}`;;
}

export const SuperTokensConfig: TypeInput = {
  supertokens: {
    connectionURI: `${process.env.SUPERTOKENS_CONNECTION_URL}`,
  },
  appInfo: {
    appName: `${process.env.APP_NAME}`,
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
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
                  clientId:  process.env.GITHUB_CLIENT_ID as string,
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
    Session.init()
  ],
};