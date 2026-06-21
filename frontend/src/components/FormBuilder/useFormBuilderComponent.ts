import find from 'lodash/find'
import flatten from 'lodash/flatten'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import { IPage } from '~~/models/interfaces/IPage'
import { IStep } from '~~/models/interfaces/IStep'
import { IElement } from '~~/models/interfaces/IElement'
import { IOption } from '~~/models/interfaces/IOption'

export const useFormBuilderComponent = () => {
  const validate = (element: IElement): boolean => {
    let isValid = true;

    if (element.visible && !element.readonly) {
      if (element.isRequired) isValid = (element.value !== "")

      if (isValid) {

      }
    }

    return isValid
  }

  const setValidationStyles = (element: IElement) => {
    element.cssClass = element.isValid ? element.cssClass?.replace(/ p-invalid/g, "") : `${element.cssClass} p-invalid`
  }

  const findPageIndex = (pages: Array<IPage>, name: string): number => {
    return findIndex(pages, (page: IPage) => {
      return page.name === name;
    })
  }

  const findElementById = (steps: Array<IStep>, key: string): IElement => {
    return find(flatten(map(steps, 'elements')), { id: key }) as IElement;
  }

  const isVisible = (steps: Array<IStep>, element: IElement): boolean => {
    const queries: Array<IOption> = element?.visibleIf || [];

    if (queries.length > 0) {
      queries.forEach((query: IOption) => {
        const parent: IElement = findElementById(steps, query.key.toString())
        element.visible = (parent.value.toLowerCase() === query.value.toString().toLowerCase())
      });
    }

    return element.visible || true
  }

  const handleInput = (steps: Array<IStep>, element: IElement) => {
    //handleValidate(emit, element)
    steps.forEach((step) => {
      step.elements?.forEach((element) => {
        if (element?.visibleIf && element.visibleIf.length > 1) {
          isVisible(steps, element)
        }
      })
    })
    if (validate(element)) {
      //emit("data-input", { id: element.id, value: element.value });
    } else {
      console.log('Not valid!')
    }
  }

  const handleValidate = (emit: any, step: IStep) => {
    step.inValidItemsCount = 0

    step.elements?.forEach((element: IElement) => {
      element.isValid = validate(element)
      setValidationStyles(element)
      if (!element.isValid) {
        step.inValidItemsCount++
      }
    })
  }

  return {
    handleInput,
    handleValidate,
    validate,
    isVisible,
    findPageIndex
  }
}

