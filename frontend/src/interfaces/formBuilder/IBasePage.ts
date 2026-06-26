export interface IBasePage<TVisibility = null, TValidation = null, TStep = null, TElement = null> {
  Visibility: TVisibility,
  Validation: TValidation,
  Step?: TStep | null,
  Element?: TElement | null
}

export interface IVisibility {

}

export interface IValidation {

}