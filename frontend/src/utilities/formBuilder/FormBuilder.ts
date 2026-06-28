import { BaseFormBuilder } from "@/utilities/formBuilder/BaseFormBuilder";
import type {
  IStep,
  IField,
  IVisibility,
  IValidation,
  IScorer
} from "@/interfaces/formBuilder";

export class FormBuilder extends BaseFormBuilder<IVisibility, IValidation, IScorer, IStep, IField> {

  constructor(
    visibility = null,
    validation = null,
    scorer = null,
    step = null,
    element = null
  ) {
    super(visibility, validation, scorer, step, element);
  }

  GetField = (Id: string, StepIndex: number): IField => {
    const Fields: Array<IField> = this.GetFields(StepIndex);

    this.Field = Fields.find(Field => Field.Id === Id) as IField;

    return this.Field;
  }
}