import { type PropType } from "vue";
import { type IElement } from "@/interfaces";

export interface IElementProps {
  element: {
    type: PropType<IElement>,
    required: true
  }
}