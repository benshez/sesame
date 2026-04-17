import { Router } from "express";
import { IController } from ".";

export abstract class BaseRoute <TController extends IController>{
  public router: Router;
  public controller: TController;
  public abstract baseUri: string;

  constructor(controller: TController) {
    this.router = Router();
    this.controller = controller;
    this.RegisterRoutes();
  }

  protected abstract RegisterRoutes(): void;
}