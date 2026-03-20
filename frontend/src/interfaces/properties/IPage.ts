import type { IElement } from "@/interfaces";

export interface IPage {
  name: string;
  heading: string;
  path: string;
  elements: Array<IElement>;
  requiresAuthenticaton: boolean;
}