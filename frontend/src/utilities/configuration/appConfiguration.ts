import type { IConfig } from "@/interfaces";
import type { HttpClientOptions } from "@/plugins"

class appConfiguration implements IConfig {
  AppName: string = "";
  AppTitle: string | undefined;
  ApiBaseUrl: string | undefined;
  AppBaseRoute?: string | undefined;
  CorsDomains: string | undefined;
  AccessToken: string | undefined;
  MapboxToken?: string | undefined;
  IsProductionEnvironment: boolean | false;
  IsDevelopmentEnvironment: boolean | false;
  ApiTimeout: number = 1000;
  ApiKey?: string;
  ApiRequestConfig: HttpClientOptions = {
    baseURL: "",
    timeout: 0,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "",
      "X-Custom-Header": "sesame"
    }
  } as HttpClientOptions;

  constructor() {
    this.AppTitle = import.meta.env.VITE_APP_TITLE;
    this.AppName = import.meta.env.VITE_APP_NAME;
    this.IsProductionEnvironment = import.meta.env.PROD;
    this.IsDevelopmentEnvironment = import.meta.env.DEV;
    this.ApiBaseUrl = `${import.meta.env.VITE_APP_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/v1`;
    this.CorsDomains = import.meta.env.VITE_APP_ACCESS_CONTROL_ALLOW_ORIGINS;
    this.AppBaseRoute = import.meta.env.VITE_APP_BASE_ROUTE;
    this.MapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    this.ApiTimeout = import.meta.env.VITE_API_TIMEOUT;
    this.ApiKey = import.meta.env.VITE_API_KEY;

    this.GetApiHeaderConfiguration();
  }

  GetApiHeaderConfiguration = (): HttpClientOptions => {
    this.ApiRequestConfig = {
      baseURL: this.ApiBaseUrl as string,
      timeout: this.ApiTimeout,
      headers: {
        "Content-type": "application/json",
      }
    };

    this.SetApiKey(this.ApiKey)

    return this.ApiRequestConfig;
  }

  SetApiKey = async (token: string = ""): Promise<void> => {
    if (token && token !== "") {
      Object.assign(this.ApiRequestConfig?.headers as object, { "x-api-key": `${token}` });
    }
  }

  GetMapboxToken = () => {
    return this.MapboxToken
  }

}

export const configuration = new appConfiguration();