import * as dotenvx from "@dotenvx/dotenvx";

export const useBackendConfig = () => {

  const ef = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

  dotenvx.config({ path: ['./environment/.env', `./environment/${ef}`] });

  const GetSMTPConfig = () => {
    return {
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
  }

  const GetApiDomain = () => {
    const apiPort = process.env.API_PORT;
    const apiUrl = process.env.API_URL;

    if (!apiPort) throw new Error('API_PORT is missing');
    if (!apiUrl) throw new Error('API_URL is missing');

    return `${apiUrl}:${apiPort}`;
  }

  const GetWebsiteDomain = () => {
    const websitePort = process.env.WEB_SITE_PORT;
    const websiteUrl = process.env.WEB_SITE_URL;

    if (!websitePort) throw new Error('WEB_SITE_PORT is missing');
    if (!websiteUrl) throw new Error('WEB_SITE_URL is missing');

    return `${websiteUrl}:${websitePort}`;
  }

  const GetSesameConnectionString = () => {
    return process.env.PG_CONNECTION_STRING;
  }

  const GetDbUser = () => {
    return process.env.POSTGRES_SESAME_USER;
  }

  const GetDbUserPassword = () => {
    return process.env.POSTGRES_SESAME_PASSWORD;
  }

  const GetDbName = () => {
    return process.env.POSTGRES_SESAME_DB;
  }

  const GetDbHost = () => {
    return process.env.POSTGRES_SESAME_HOST;
  }
  

  return {
    GetSMTPConfig,
    GetApiDomain,
    GetWebsiteDomain,
    GetSesameConnectionString,
    GetDbUser,
    GetDbUserPassword,
    GetDbName,
    GetDbHost
  }
}