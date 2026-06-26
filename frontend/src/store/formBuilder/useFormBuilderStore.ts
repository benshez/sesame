import { defineStore, } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { FormBuilder } from "@/utilities/formBuilder/FormBuilder";
import { Visibility } from "@/utilities/formBuilder/Visibility";
import { Validation } from "@/utilities/formBuilder/Validation";
import { useUserStore } from "@/store/user/useUserStore";
import type {
  IPage,
  IStep,
  IElement,
  IFieldset
} from "@/interfaces/formBuilder";

export const useFormBuilderStore = defineStore("FormBuilderStore", () => {

  const FormBuilderPages = new FormBuilder();

  const FormBuilderState = ref(useLocalStorage("sesame.form.builder.state", {
    CurrentPage: {} as IPage,
  }));

  const Initialise = async () => {
    if (typeof FormBuilderState.value.CurrentPage.CurrentStepIndex === "undefined") {
      await FormBuilderPages.Initialise();
      FormBuilderState.value.CurrentPage = FormBuilderPages.GetCurrentPage();
    }
  }

  const NextStep = async () => {
    const CurrentIndex = FormBuilderState.value.CurrentPage.CurrentStepIndex;
    const StepCount = FormBuilderState.value.CurrentPage.Steps ? FormBuilderState.value.CurrentPage.Steps.length : 0;
    const IsFinalStep: boolean = FormBuilderState.value.CurrentPage.Steps ? CurrentIndex === FormBuilderState.value.CurrentPage.Steps.length - 1 : false;
    const Fieldsets: Array<IFieldset> = FormBuilderState.value.CurrentPage.Steps?.at(FormBuilderState.value.CurrentPage.CurrentStepIndex)?.Fieldsets as Array<IFieldset>;
    const CurrentStep: IStep = FormBuilderState.value.CurrentPage.Steps?.at(FormBuilderState.value.CurrentPage.CurrentStepIndex) as unknown as IStep;

    for (const Fieldset of Fieldsets) {
      for (const Element of Fieldset.Elements as Array<IElement>) {
        await OnValidate(Element);
      }
    }

    if (CurrentStep && CurrentStep.HasValidationErrors) return;

    if (IsFinalStep) {
      Submit();
      return;
    }

    if (StepCount > CurrentIndex && !IsFinalStep) {
      FormBuilderState.value.CurrentPage.CurrentStepIndex++;
    }
  }

  const Submit = () => {

  }

  const PreviousStep = () => {
    const CurrentIndex = FormBuilderState.value.CurrentPage.CurrentStepIndex;

    if (CurrentIndex > 0) {
      FormBuilderState.value.CurrentPage.CurrentStepIndex--;
    }
  }

  const OnInput = async (e: IElement) => {
    UpdateElementState(e.Id as string, { key: "Value", value: e.Value });
    await OnValidate(e);
  }

  const OnValidate = async (e: IElement) => {
    const IsValid = await FormBuilderPages.HandleIsValid(e);
    const Fieldsets: Array<IFieldset> = FormBuilderState.value.CurrentPage.Steps?.at(FormBuilderState.value.CurrentPage.CurrentStepIndex)?.Fieldsets as Array<IFieldset>;

    UpdateElementState(e.Id as string, { key: "IsValid", value: IsValid });

    let InvalidItemsCount: number = 0;

    Fieldsets.forEach((Fieldset: IFieldset) => {
      Fieldset.Elements?.forEach((Element: IElement) => {
        if (!Element.IsValid) {
          InvalidItemsCount++;
        }
      })
    })

    //FormBuilderState.value.CurrentStep.InvalidItemsCount = InvalidItemsCount;
  }

  const UpdateElementState = (key: string, options: { key: string, value: unknown | [] }) => {
    const element: IElement = FormBuilderPages.GetElement(key, FormBuilderState.value.CurrentPage.CurrentStepIndex);

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
    NextStep,
    Submit,
    PreviousStep,
    OnInput
  }
})