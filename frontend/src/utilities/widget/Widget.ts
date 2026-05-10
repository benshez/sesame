import { configuration } from "@/utilities";
import type { IWidgetOptions } from "@/interfaces";

class Widget {
  private options: IWidgetOptions | undefined = undefined;
  private parent: HTMLDivElement | null;
  private container: HTMLDivElement | null;
  private appName: string = "";

  constructor() {
    this.appName = configuration.AppName;
    this.parent = this.GetContainer(`${this.appName}-parent-container`);
    this.container = this.GetContainer(`${this.appName}-container`);
  }

  GetContainer = (containerId: string): HTMLDivElement | null => {
    return document
      .getElementById(`${containerId}`) as HTMLDivElement | null;
  }

  SetWidgetOptions = (): void => {
    if (this.parent?.dataset.options) {
      this.options = Object.assign({}, JSON.parse(this.parent.dataset.options));
    }
  }

  GetWidgetOptions = (): IWidgetOptions => {
    this.SetWidgetOptions();
    return this.options || {} as IWidgetOptions;
  }

  GetAppMountId = (): string => {
    return this.container?.id as string;
  }
}

export const widget = new Widget();