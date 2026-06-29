import { defineStore, } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { FormBuilder } from "@/utilities/formBuilder/FormBuilder";

import type {
  IPages,
  IPage,
  IStep,
  IField,
  IFieldset
} from "@/interfaces/formBuilder";

export const useFormBuilderStore = defineStore("FormBuilderStore", () => {

  const FormBuilderPages = new FormBuilder(null, null, null, null);

  const FormBuilderState = ref(useLocalStorage("sesame.form.builder.state", {
    Pages: {} as IPages,
  }));

  const Initialise = async () => {
    if (!FormBuilderState.value.Pages.Pages) {
      await FormBuilderPages.Initialise();
      FormBuilderState.value.Pages = FormBuilderPages.Pages;
    } else {
      FormBuilderPages.Pages = FormBuilderState.value.Pages;
    }
  }

  const NextStep = async () => {
    const CurrentPage: IPage = FormBuilderPages.Pages.Page || {} as IPage;
    let CurrentIndex = CurrentPage.CurrentStepIndex || 0;
    const StepCount = CurrentPage.Steps ? CurrentPage.Steps.length : 0;

    if (CurrentPage) {
      const IsFinalStep: boolean = CurrentPage.Steps ? CurrentIndex === CurrentPage.Steps.length - 1 : false;
      const Fieldsets: Array<IFieldset> = CurrentPage.Steps?.at(CurrentIndex)?.Fieldsets as Array<IFieldset>;
      const CurrentStep: IStep = CurrentPage.Steps?.at(CurrentIndex) as unknown as IStep;

      for (const Fieldset of Fieldsets) {
        for (const Field of Fieldset.Fields as Array<IField>) {
          await OnValidate(Field);
          if (CurrentStep && CurrentStep.HasValidationErrors) break;
        }
        if (CurrentStep && CurrentStep.HasValidationErrors) break;
      }

      if (CurrentStep && CurrentStep.HasValidationErrors) return;

      if (IsFinalStep) {
        Submit();
        return;
      }

      if (StepCount > CurrentIndex && !IsFinalStep && CurrentPage) {
        CurrentIndex++;
        CurrentPage.CurrentStepIndex = CurrentIndex;
      }
    }
  }

  const Submit = () => {

  }

  const GetCurrentPage = (): IPage => {
    return FormBuilderState.value.Pages.Page || {} as IPage;
  }

  const PreviousStep = () => {
    const CurrentPage: IPage = GetCurrentPage();
    let CurrentIndex = CurrentPage.CurrentStepIndex || 0;

    if (CurrentPage) {
      CurrentIndex++;
      CurrentPage.CurrentStepIndex = CurrentIndex;
    }
  }

  const OnInput = async (e: IField) => {
    UpdateFieldState(e.Id as string, { key: "Value", value: e.Value });
    await OnValidate(e);
    await CalculateScore()
  }

  const CalculateScore = async () => {
    const CurrentPage: IPage = GetCurrentPage();
    if (FormBuilderPages.Pages && FormBuilderPages.Pages.Page) {
      const Steps: Array<IStep> = FormBuilderPages.Pages.Page.Steps as Array<IStep>;
      const Score = await FormBuilderPages.GetScore(Steps);
      CurrentPage.Score = Score;
    }
  }

  const OnValidate = async (e: IField) => {
    const CurrentPage: IPage = GetCurrentPage();
    const CurrentIndex = CurrentPage.CurrentStepIndex || 0;

    if (CurrentPage) {
      const Step: IStep = CurrentPage.Steps?.at(CurrentIndex) as unknown as IStep;
      const IsValid = await FormBuilderPages.IsValid(e);

      Step.HasValidationErrors = false;

      UpdateFieldState(e.Id as string, { key: "IsValid", value: IsValid });

      if (!IsValid && Step) {
        Step.HasValidationErrors = true;
      }
    }
  }

  const UpdateFieldState = (key: string, options: { key: string, value: unknown | [] }) => {
    const CurrentPage: IPage = GetCurrentPage();
    if (CurrentPage && CurrentPage.CurrentStepIndex) {
      const field: IField = FormBuilderPages.GetField(key, CurrentPage.CurrentStepIndex);

      if (!field) return;

      switch (options.key) {
        case "Value":
          field.Value = options.value as string | Array<string>;
          break;
        case "IsValid":
          field.IsValid = options.value as boolean;
          break;
        case "IsVisible":
          field.IsVisible = options.value as boolean;
          break;
        case "HelpText":
          field.HelpText = options.value as string;
          break;
      }
    }
  }

  return {
    FormBuilderState,
    Initialise,
    GetCurrentPage,
    NextStep,
    Submit,
    PreviousStep,
    OnInput
  }
})