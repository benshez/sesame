import { Router } from "express";
import { IController, IControllerRequest, IControllerResponse } from ".";

export abstract class BaseRoute <TController extends IController> {
  public router: Router;
  public controller: TController;
  public request: IControllerRequest;
  public response: IControllerResponse;
  public abstract baseUri: string;

  constructor(controller: TController, request?: IControllerRequest, response?: IControllerResponse) {
    this.router = Router();
    this.controller = controller;
    this.request = request || null as unknown as IControllerRequest;
    this.response = response || null as unknown as IControllerResponse;
    this.RegisterRoutes();
  }

  protected abstract RegisterRoutes(): void;
}