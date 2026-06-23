import { IFormBuilderRequest } from "./IFormBuilderRequest";

export interface IFormBuilderService {
  CreateTenantFolder(request: IFormBuilderRequest): Promise<{
    status: "OK";
  } | {
    status: "DIRECTORY_CREATION_ERROR";
  }>;
  ReadTenantJson(request: IFormBuilderRequest): Promise<{
    status: "OK",
    Pages: {};
  } | {
    status: "DIRECTORY_CREATION_ERROR";
  }>;
  WriteTenantJson(request: IFormBuilderRequest): Promise<{
    status: "OK";
  } | {
    status: "DIRECTORY_CREATION_ERROR";
  }>;
}