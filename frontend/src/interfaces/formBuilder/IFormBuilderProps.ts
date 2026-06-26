import type { PropType } from "vue";
import type { IPage } from "@/interfaces/formBuilder";
import type { IFieldset } from "@/interfaces/formBuilder";
import type { IElement } from "@/interfaces/formBuilder";


export type IFormBuilderProps = {
  Fieldsets: {
    type: PropType<Array<IFieldset>>,
    required: false,
    default: {}
  }
  Elements: {
    type: PropType<Array<IElement>>,
    required: false,
    default: []
  }
  Element: {
    type: PropType<IElement>,
    required: false,
    default: {}
  }
  CurrentPage: {
    type: PropType<IPage>,
    required: false
    default: {}
  }
  ShowStepper: {
    type: PropType<boolean>,
    required: false,
    default: false
  }
  ShowNavigator: {
    type: PropType<boolean>,
    required: false
    default: false
  }
  StepCount: {
    type: PropType<number>,
    required: false
    default: 0
  }
  HasValidationErrors: {
    type: PropType<boolean>,
    required: false,
    default: false
  }
  Layout: {
    type: PropType<number>,
    required: false,
    default: 1
  }
  NextNavigationText: {
    type: PropType<string>,
    required: false,
    default: "Next"
  }
  PreviousNavigationText: {
    type: PropType<string>,
    required: false,
    default: "Back"
  }
}

export const FormBuilderProps: IFormBuilderProps = {
  Element: {
    type: Object as PropType<IElement>,
    required: false,
    default: {}
  },
  Elements: {
    type: Array as PropType<Array<IElement>>,
    required: false,
    default: []
  },
  HasValidationErrors: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  Layout: {
    type: Number as PropType<number>,
    required: false,
    default: 1
  },
  Fieldsets: {
    type: Object as PropType<Array<IFieldset>>,
    required: false,
    default: {}
  },
  CurrentPage: {
    type: Object as PropType<IPage>,
    required: false,
    default: {}
  },
  ShowStepper: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  ShowNavigator: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  StepCount: {
    type: Number as PropType<number>,
    required: false,
    default: 0
  },
  NextNavigationText: {
    type: String as PropType<string>,
    required: false,
    default: "Next"
  },
  PreviousNavigationText: {
    type: String as PropType<string>,
    required: false,
    default: "Back"
  }
}