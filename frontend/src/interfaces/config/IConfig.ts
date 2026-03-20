import type { AxiosRequestConfig } from "axios";
import { type FirebaseOptions } from "firebase/app";

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
  ApiRequestConfig?: AxiosRequestConfig;
  FirebaseConfig? : FirebaseOptions;
  GetApiHeaderConfiguration(): object;
}
