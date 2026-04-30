import { defineStore, } from "pinia";
import type { IElement } from "@/interfaces";
import { useRegisterView, useProfileView, usePersonalInfoView, useLoginView, useEventView } from "@/store"
import { useObjectHelper } from "@/utilities";
import type { DateTime } from "ts-luxon";

export const useFormStore = defineStore("form", {
  state: () => ({
    elementsState: [] as Array<IElement>
  }),
  actions: {
    getElements(route: string) {
      let elements: Array<IElement> = [];

      switch (route) {
        case "profile":
          elements = useProfileView().GetElements();
          break;
        case "personalInfo":
          elements = usePersonalInfoView().GetElements();
          break;
        case "auth":
          elements = useLoginView().GetElements();
          break;
        case "register":
          elements = useRegisterView().GetElements();
          break;
        case "map":
          elements = useEventView().GetElements();
      }

      this.$state.elementsState = elements as Array<IElement>;
    },

    getElement(key: string): IElement {
      return this.$state.elementsState
        .find((el) => { return el.id === key }) as IElement
    },

    bind(payload: any) {
      const elements = this.$state.elementsState;
      const helper = useObjectHelper();

      elements.forEach((element: IElement) => {
        if (element.id != "") {
          this.updateElementState(element.id as string, { key: "value", value: helper.GetProperty(payload, element?.id as string) });
        }
      })
    },

    updateElementState(key: string, options: { key: string, value: unknown }) {
      const element: IElement = this.getElement(key);

      if (!element) return;

      switch (options.key) {
        case "value":
          element.value = options.value as string;
          break;
        case "isValid":
          element.isValid = options.value as boolean;
          break;
        case "isVisible":
          element.isVisible = options.value as boolean;
          break;
        case "helpText":
          element.helpText = options.value as string;
          break;
      }
    },

    getElementValue(key: string): string | number | DateTime {
      const element: IElement = this.getElement(key);

      if (!element) return "";

      return element.value;
    },

    handleInput(key: string) {
      this.handleDisplay(key);
      //this.handleValidate(key);
    },

    async handleValidate(key: string) {
      const element: IElement = this.getElement(key);

      const isValid: boolean = await element?.isValidIf?.();

      this.updateElementState(key, { key: "isValid", value: isValid });
    },

    async handleDisplay(key: string) {
      const element: IElement = this.getElement(key);
      let display: boolean = element.isVisible || true;

      if(display) this.handleValidate(key);

      this.updateElementState(key, { key: "isVisible", value: display });
    }
  },
  getters: {
    elements: (state) => state.elementsState
  }
})