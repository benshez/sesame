<template>
  <div class="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark">
    <div v-if="ShowStepper" class="border-b border-gray-200 dark:border-gray-800">
      <div class="px-6 py-5">
        <FormStepperSteps :-current-page="FormBuilderStore.FormBuilderState.CurrentPage"
          :-step-count="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.length" />
      </div>
    </div>
    <div class="border-b border-gray-200 dark:border-gray-800 mt-5">
      <div class="px-6 py-5">
        <FormStepperFieldsets :-fieldsets="FormBuilderStore.FormBuilderState.CurrentStep.Fieldsets"
          :-step-count="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.length"
          :-in-valid-items-count="FormBuilderStore.FormBuilderState.CurrentStep.InValidItemsCount"
          :-layout="2"
          @on-input="OnInput" />
      </div>
    </div>
    <div class="px-6 py-5" v-if="ShowNavigator" >
      <FormStepperNavigator :-current-page="FormBuilderStore.FormBuilderState.CurrentPage"
        :-step-count="FormBuilderStore.FormBuilderState.CurrentPage.Steps?.length"
        :-in-valid-items-count="FormBuilderStore.FormBuilderState.CurrentStep.InValidItemsCount"
        :-next-navigation-text="NextNavigationText"
        :-previous-navigation-text="PreviousNavigationText"
        @on-previous-step="PreviousStep" @on-next-step="NextStep" />
    </div>
  </div>

</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useFormBuilderStore } from "@/store";
import FormStepperSteps from "@/components/FormBuilder/FormStepperSteps.vue";
import FormStepperFieldsets from "@/components/FormBuilder/FormStepperFieldsets.vue";
import FormStepperNavigator from "@/components/FormBuilder/FormStepperNavigator.vue";
import type { IElement } from "@/interfaces/formBuilder";

interface Props {
  ShowStepper: boolean;
  ShowNavigator: boolean;
  NextNavigationText: string;
  PreviousNavigationText: string;
}

const props = defineProps<Props>();
const FormBuilderStore = useFormBuilderStore();

const NextStep = async () => {
  await FormBuilderStore.NextStep();
}

const PreviousStep = () => {
  FormBuilderStore.PreviousStep();
}

const OnInput = async (e: IElement) => {
  await FormBuilderStore.OnInput(e);
}

onMounted(async () => {
  await FormBuilderStore.Initialise();
})
</script>
