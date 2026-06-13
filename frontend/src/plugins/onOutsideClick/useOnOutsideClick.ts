import type { IOutsideClickParams } from "@/interfaces";

export const useOnOutsideClick = () => {

  const OnOutsideClick = (params: IOutsideClickParams, e: Event) => {
    const target = e.target as HTMLElement;
    const trigger = document.querySelector(`.${params.triggerClass}`);

    if (trigger === target || target.classList.contains(params.triggerClass)) {
      if (typeof params.displayMethod === "function") {
        params.displayMethod(params.displayMethodParam)
      }
      return;
    }
    if (typeof params.displayMethod === "function") {
      params.displayMethod(params.displayMethodParam)
    }
  }

  return {
    OnOutsideClick
  }
}