import type { PropType } from "vue";
import type { IStep, IPage, IElement } from "@/interfaces";

export type IPagesProps = {
  pages: {
    type: PropType<Array<IPage>>,
    required: true
  },
  pageIndex: {
    type: PropType<number>,
    required: true
  }
}

export const PagesProps: IPagesProps = {
  pages: {
    type: Object as PropType<Array<IPage>>,
    required: true
  },
  pageIndex: {
    type: Number,
    required: true
  }
}

export type IPageProps = {
  page: {
    type: PropType<IPage>,
    required: true
  },
  pageIndex: {
    type: PropType<number>,
    required: true
  }
}

export const PageProps: IPageProps = {
  page: {
    type: Object as PropType<IPage>,
    required: true
  },
  pageIndex: {
    type: Number,
    required: true
  }
}


export interface IStepsProps {
  steps: {
    type: PropType<Array<IStep>>,
    required: true
  }
}

export const StepsProps: IStepsProps = {
  steps: {
    type: Object as PropType<Array<IStep>>,
    required: true
  }
}

export interface IElementProps {
  element: {
    type: PropType<IElement>,
    required: true
  }
}

export const ElementProps: IElementProps = {
  element: {
    type: Object as PropType<IElement>,
    required: true
  }
}