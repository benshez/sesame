
export interface IConfig {
  AppName: string;
  AppTitle?: string;
  ApiBaseUrl?: string;
  AppBaseRoute?: string;
  AorsDomains?: string;
  AccessToken?: string;
  MapboxToken?: string;
  IsProductionEnvironment: boolean;
  IsDevelopmentEnvironment: boolean;
  GetApiHeaderConfiguration(): object;
}
