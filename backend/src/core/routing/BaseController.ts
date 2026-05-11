import { IController, IControllerRequest, IControllerResponse } from "./";

export abstract class BaseController implements IController {
  public ControllerRequest: IControllerRequest;
  public ControllerResponse: IControllerResponse;

  constructor(request?: IControllerRequest, response?: IControllerResponse) {
    this.ControllerRequest = request || null as unknown as IControllerRequest;
    this.ControllerResponse = response || null as unknown as IControllerResponse;
  }
}