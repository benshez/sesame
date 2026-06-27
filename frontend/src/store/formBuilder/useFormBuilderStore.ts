import { defineStore, } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { FormBuilder } from "@/utilities/formBuilder/FormBuilder";

import type {
  IPages,
  IPage,
  IStep,
  IElement,
  IFieldset
} from "@/interfaces/formBuilder";

export const useFormBuilderStore = defineStore("FormBuilderStore", () => {

  const FormBuilderPages = new FormBuilder();

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
    const CurrentPage: IPage = FormBuilderPages.Pages.Page;
    const CurrentIndex = CurrentPage.CurrentStepIndex;
    const StepCount = CurrentPage.Steps ? CurrentPage.Steps.length : 0;
    const IsFinalStep: boolean = CurrentPage.Steps ? CurrentIndex === CurrentPage.Steps.length - 1 : false;
    const Fieldsets: Array<IFieldset> = CurrentPage.Steps?.at(CurrentPage.CurrentStepIndex)?.Fieldsets as Array<IFieldset>;
    const CurrentStep: IStep = CurrentPage.Steps?.at(CurrentPage.CurrentStepIndex) as unknown as IStep;

    for (const Fieldset of Fieldsets) {
      for (const Element of Fieldset.Elements as Array<IElement>) {
        await OnValidate(Element);
        if (CurrentStep && CurrentStep.HasValidationErrors) break;
      }
      if (CurrentStep && CurrentStep.HasValidationErrors) break;
    }

    if (CurrentStep && CurrentStep.HasValidationErrors) return;

    if (IsFinalStep) {
      Submit();
      return;
    }

    if (StepCount > CurrentIndex && !IsFinalStep) {
      CurrentPage.CurrentStepIndex++;
    }
  }

  const Submit = () => {

  }

  const GetCurrentPage = (): IPage => {
    return FormBuilderState.value.Pages.Page;
  }

  const PreviousStep = () => {
    const CurrentPage: IPage = GetCurrentPage();
    const CurrentIndex = GetCurrentPage().CurrentStepIndex;

    if (CurrentIndex > 0) {
      CurrentPage.CurrentStepIndex--;
    }
  }

  const OnInput = async (e: IElement) => {
    UpdateElementState(e.Id as string, { key: "Value", value: e.Value });
    await OnValidate(e);
  }

  const OnValidate = async (e: IElement) => {
    const IsValid = await FormBuilderPages.HandleIsValid(e);
    const CurrentPage: IPage = GetCurrentPage();
    const Step: IStep = CurrentPage.Steps?.at(CurrentPage.CurrentStepIndex) as unknown as IStep;
    Step.HasValidationErrors = false;

    UpdateElementState(e.Id as string, { key: "IsValid", value: IsValid });

    if (!IsValid && Step) {
      Step.HasValidationErrors = true;
    }
  }

  const UpdateElementState = (key: string, options: { key: string, value: unknown | [] }) => {
    const CurrentPage: IPage = GetCurrentPage();
    const element: IElement = FormBuilderPages.GetElement(key, CurrentPage.CurrentStepIndex);

    if (!element) return;

    switch (options.key) {
      case "Value":
        element.Value = options.value as string | Array<string>;
        break;
      case "IsValid":
        element.IsValid = options.value as boolean;
        break;
      case "IsVisible":
        element.IsVisible = options.value as boolean;
        break;
      case "HelpText":
        element.HelpText = options.value as string;
        break;
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