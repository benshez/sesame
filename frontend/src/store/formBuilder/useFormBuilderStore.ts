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
  IKeyValue,
  IValidation,
  IVisibility,
  IFieldset
} from "@/interfaces/formBuilder";

export const useFormBuilderStore = defineStore("FormBuilderStore", () => {
  const UserStore = useUserStore();

  const FormBuilderPages = new FormBuilder(
    new Visibility(),
    new Validation(),
    UserStore.GetTenantIdFromRoute());

  const FormBuilderState = ref(useLocalStorage("sesame.form.builder.state", {
    Pages: [] as Array<IPage>,
    CurrentPage: {} as IPage,
    CurrentStep: {} as IStep
  }));

  const Initialise = async () => {
    await FormBuilderPages.Initialise();

    FormBuilderState.value.Pages = FormBuilderPages.Pages;

    FormBuilderState.value.CurrentPage = FormBuilderPages.GetCurrentPage();

    SetCurrentStep();
  }

  const SetCurrentStep = () => {
    if (FormBuilderState.value.CurrentPage.Steps) {
      FormBuilderState.value.CurrentStep = FormBuilderPages.GetCurrentStep(FormBuilderState.value.CurrentPage.CurrentStepIndex);
    }
  }

  const NextStep = () => {
    const CurrentIndex = FormBuilderState.value.CurrentPage.CurrentStepIndex;
    const StepCount = FormBuilderState.value.CurrentPage.Steps ? FormBuilderState.value.CurrentPage.Steps.length : 0;
    const IsFinalStep: boolean = FormBuilderState.value.CurrentPage.Steps ? CurrentIndex === FormBuilderState.value.CurrentPage.Steps.length - 1 : false;

    if (StepCount > CurrentIndex && !IsFinalStep) {
      FormBuilderState.value.CurrentPage.CurrentStepIndex++;

      if (IsFinalStep) {
        Submit();
      } else {
        SetCurrentStep();
      }
    }
  }

  const Submit = () => {

  }

  const PreviousStep = () => {
    const CurrentIndex = FormBuilderState.value.CurrentPage.CurrentStepIndex;

    if (CurrentIndex > 0) {
      FormBuilderState.value.CurrentPage.CurrentStepIndex--;
      SetCurrentStep();
    }
  }

  const OnInput = async (e: IElement) => {
    await OnValidate(e);
  }

  const OnValidate = async (e: IElement) => {
    UpdateElementState(e.Id as string, { key: "Value", value: e.Value });

    const IsValid = await FormBuilderPages.HandleIsValid(e);

    UpdateElementState(e.Id as string, { key: "IsValid", value: IsValid });

    let InvalidItemsCount: number = 0;

    FormBuilderState.value.CurrentStep.Fieldsets?.forEach((Fieldset: IFieldset) => {
      Fieldset.Elements?.forEach((Element: IElement) => {
        if (!Element.IsValid)  {
          InvalidItemsCount++;
        }
      })
    })

    FormBuilderState.value.CurrentStep.InValidItemsCount = InvalidItemsCount;
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