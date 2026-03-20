import { type PropType } from "vue";
import { type IElement, type IElementProps } from "@/interfaces";

export const ElementProps: IElementProps = {
  element: {
    type: Object as PropType<IElement>,
    required: true
  }
}