import { IController } from ".";

export abstract class BaseController<TService = unknown> implements IController<TService> {
  
  public ControllerService: TService;

  constructor(service: TService) {
    this.ControllerService = service;
  }
}