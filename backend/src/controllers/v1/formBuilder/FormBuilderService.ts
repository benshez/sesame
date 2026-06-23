import fs from "fs/promises";
import { IFormBuilderRequest, IFormBuilderService } from ".";

export class FormBuilderService implements IFormBuilderService {
  CreateTenantFolder = async (request: IFormBuilderRequest): Promise<{
    status: "OK";
  } | {
    status: "DIRECTORY_CREATION_ERROR";
  }> => {
    if (request.baseRequest.tenantId !== "" && typeof request.dir !== "undefined") {
      await fs.mkdir(request.dir, { recursive: false });
      return {
        status: "OK"
      };
    } else {
      return {
        status: "DIRECTORY_CREATION_ERROR"
      };
    }
  }
  ReadTenantJson = async (request: IFormBuilderRequest): Promise<{
    status: "OK"
    Pages: {};
  } | {
    status: "DIRECTORY_CREATION_ERROR";
  }> => {
    let Json: string = "";

    if (typeof request.dataFile !== "undefined") {
      Json = await fs.readFile(request.dataFile, "utf-8");
    }

    return{
      status: "OK",
      Pages: JSON.parse(Json)
    };
  }
  WriteTenantJson = async (request: IFormBuilderRequest): Promise<{
    status: "OK";
  } | {
    status: "DIRECTORY_CREATION_ERROR";
  }> => {
    const create = await this.CreateTenantFolder(request);

    if (create.status === "OK" && typeof request.dir !== "undefined" && typeof request.dataFile !== "undefined") {
      await fs.writeFile(request.dataFile, JSON.stringify(request.json, null, 2), "utf-8");

      return await this.ReadTenantJson(request);
    } else {
      return {
        status: "DIRECTORY_CREATION_ERROR"
      };
    }
  }
}