import { PathLike } from "fs";
import { IBaseRequest } from "..";

export interface IFormBuilderRequest {
  baseRequest: IBaseRequest;
  dir?: PathLike;
  version?: string;
  dataFile?: PathLike; 
  json?: string;
}