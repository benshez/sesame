export interface IBasePage<TVisibility = null, TValidation = null, TScorer = null, TStep = null, TElement = null> {
  Visibility: TVisibility,
  Validation: TValidation,
  Step?: TStep | null,
  Element?: TElement | null
}

export interface IVisibility {

}

export interface IValidation {

}

export interface IScorer {

}