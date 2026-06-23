import { SessionRequest } from "supertokens-node/framework/express";
import { IFormBuilderRequest } from "./IFormBuilderRequest";
import { sanitize } from "express-xss-sanitizer";
import path from "path";

export class FormBuilderRequest {
  public request: IFormBuilderRequest = {
    baseRequest: {
      userId: "",
      tenantId: "",
      recipeUserId: undefined
    },
    dir: undefined,
    version: "1",
    dataFile: undefined,
    json: ""
  } as IFormBuilderRequest;

  CreateRequest = (req: SessionRequest): IFormBuilderRequest => {
    const session = req.session;
    const body = req.body;
    const params = req.params;

    this.request.baseRequest.tenantId = session!.getTenantId();

    if (body && body.json) {
      this.request.json = body.json;
      if (body.version) this.request.version = body.version;
    }

    if (params.version) {
      this.request.version = params.version;
    }

    if (this.request.baseRequest.tenantId !== "") {
      if (this.request.version === "") this.request.version = "1";
      this.request.dir = path.join(__dirname, "../../../core/db/formBuilder/", this.request.baseRequest.tenantId, `v${this.request.version}`);
      this.request.dataFile = path.join(__dirname, "../../../core/db/formBuilder/", this.request.baseRequest.tenantId, `v${this.request.version}`, `${this.request.baseRequest.tenantId}.json`);
    }

    return sanitize(this.request);
  }
}