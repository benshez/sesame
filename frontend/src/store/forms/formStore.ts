import { ref } from "vue";
import { defineStore, } from "pinia";
import type { IElement } from "@/interfaces";
import { useRegisterView, useProfileView, usePersonalInfoView, useLoginView, useEventView } from "@/store"
import { useObjectHelper } from "@/utilities";
import type { DateTime } from "ts-luxon";
import { useLocalStorage } from "@vueuse/core";

export const useFormStore = defineStore("form", () => {
  const formState = ref(useLocalStorage("sesame.form.state", {
    formIsValid: true,
    elements: [] as Array<IElement>
  }));

  const getElements = (route: string) => {
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

    formState.value.elements = elements as Array<IElement>;
  }

  const getElement = (key: string): IElement => {
    return formState.value.elements
      .find((el) => { return el.id === key }) as IElement
  };

  const bind = (payload: any) => {
    const elements = formState.value.elements;
    const helper = useObjectHelper();

    elements.forEach((element: IElement) => {
      if (element.id != "") {
        updateElementState(element.id as string, { key: "value", value: helper.GetProperty(payload, element?.id as string) });
      }
    })
  }

  const updateElementState = (key: string, options: { key: string, value: unknown }) => {
    const element: IElement = getElement(key);

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
  }

  const getElementValue = (key: string): string | number | DateTime => {
    const element: IElement = getElement(key);

    if (!element) return "";

    return element.value;
  }

  const handleInput = (key: string) => {
    handleDisplay(key);
  }

  const handleValidate = async (key: string) => {
    const element: IElement = getElement(key);

    const isValid: boolean = await element?.isValidIf?.();

    formState.value.formIsValid = isValid;

    updateElementState(key, { key: "isValid", value: isValid });
  }

  const handleDisplay = async (key: string) => {
    const element: IElement = getElement(key);
    let display: boolean = element.isVisible || true;

    if (display) handleValidate(key);

    updateElementState(key, { key: "isVisible", value: display });
  }

  return {
    formState,
    getElements,
    getElement,
    getElementValue,
    bind,
    handleInput,
    updateElementState
  }
})