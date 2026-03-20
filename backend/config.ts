import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import type { ProviderInput } from "supertokens-node/recipe/thirdparty/types";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import MultiFactorAuth from "supertokens-node/recipe/multifactorauth";
import AccountLinking from "supertokens-node/recipe/accountlinking";
import EmailVerification from "supertokens-node/recipe/emailverification";
import WebAuthN from "supertokens-node/recipe/webauthn";
import type { AccountInfoWithRecipeId } from "supertokens-node/recipe/accountlinking/types";
import type { User } from "supertokens-node/types";
import type { TypeInput } from "supertokens-node/types";
//import * as dotenv from "dotenv";
import * as dotenvx from "@dotenvx/dotenvx";


const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenvx.config({ path: ['./environment/.env',`./environment/${envFile}`] });

console.log('Loaded environment:', `${process.env.WEB_SITE_URL}:${process.env.WEB_SITE_PORT}`);

//const configPath = `./environment/.env.${process.env.NODE_ENV}`;
//console.log(process.env.NODE_ENV);
//dotenvx.config({path: [configPath, `./environment/.env`]});

//dotenv.config({ path: configPath });

//console.log(process.env.API_URL);


//dotenv.config({ path: "./environment/.env.dev" });

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
    
  ],
};