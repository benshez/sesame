import { Router } from "express";
import { IController } from "."

export interface IRoute {
  controller: IController;
  baseUri: string;
  router: Router;
}