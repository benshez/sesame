<template>
  <div v-if="FormBuilderStore.FormBuilderState.CurrentPage" class="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark">
    <div v-if="ShowStepper" class="border-b border-gray-200 dark:border-gray-800">
      <div class="px-6 py-5">
        <FormStepperSteps :-current-page="Page" :-step-count="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.length" />
      </div>
    </div>
    <div class="border-b border-gray-200 dark:border-gray-800 mt-5">
      <div class="px-6 py-5">
        <FormStepperFieldsets
          :-fieldsets="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.at(FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex)?.Fieldsets"
          :-step-count="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.length"
          :-has-validation-errors="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.at(FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex)?.HasValidationErrors"
          :-layout="2" @on-input="OnInput" />
      </div>
    </div>
    <div class="px-6 py-5" v-if="ShowNavigator">
      <FormStepperNavigator :-current-page="FormBuilderStore.FormBuilderState.CurrentPage" :-step-count="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.length"
        :-has-validation-errors="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.at(FormBuilderStore.FormBuilderState.CurrentPage.CurrentStepIndex)?.HasValidationErrors"
        :-next-navigation-text="NextNavigationText" :-previous-navigation-text="PreviousNavigationText"
        @on-previous-step="PreviousStep" @on-next-step="NextStep" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useFormBuilderStore } from "@/store";
import { FormBuilder } from "@/utilities/formBuilder/FormBuilder";
import FormStepperSteps from "@/components/FormBuilder/FormStepperSteps.vue";
import FormStepperFieldsets from "@/components/FormBuilder/FormStepperFieldsets.vue";
import FormStepperNavigator from "@/components/FormBuilder/FormStepperNavigator.vue";
import type { IElement, IPage } from "@/interfaces/formBuilder";
import { FormBuilderProps } from "@/interfaces/formBuilder/IFormBuilderProps";

const props = defineProps(FormBuilderProps);

const FormBuilderStore = useFormBuilderStore();

const NextStep = async () => {
  await FormBuilderStore.NextStep();
}

const PreviousStep = () => {
  FormBuilderStore.PreviousStep();
}

const OnInput = async (e: IElement) => {
  //Builder.SetElementValue(e.Value)
  //await FormBuilderStore.OnInput(e);
}


onMounted(async () => {
  //const Builder = new FormBuilder();
  //await Builder.Initialise();

  //Page.value = Builder.GetCurrentPage();
  await FormBuilderStore.Initialise();
})
</script>
