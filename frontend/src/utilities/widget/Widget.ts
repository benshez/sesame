//import { configuration, getCurrentUser, auth } from "@/utilities/index";
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
    // const db = useFirebase();

    // if (this.options?.userId !== "") {
    //   const getUserInfo = async () => {
    //     return await db.getCurrentUser()
    //   }
    //   getUserInfo();
    //   //const pages = usePageData().getData();

    //   this.options = {
    //     userId: db.auth.currentUser?.uid,
    //     container: this.container?.id || "",
    //     userInfo: {
    //       email: db.auth.currentUser?.email || "",
    //       uid: db.auth.currentUser?.uid || "",
    //       displayName: db.auth.currentUser?.displayName || "",
    //       emailVerified: db.auth.currentUser?.emailVerified,
    //     },
    //     //pages
    //   };
    // }
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