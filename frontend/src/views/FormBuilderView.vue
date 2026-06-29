<template>
  <BaseLayout>
    <FormStepper :-show-navigator="true" :-show-stepper="true" :-next-navigation-text="'Next'"
      :-previous-navigation-text="'Back'" />
    Home
{{ Page }}
  </BaseLayout>
</template>
<script setup lang="ts">
import { ref, onMounted, type PropType } from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormStepper from "@/components/FormBuilder/FormStepper.vue";
import { type IPages } from "@/interfaces/formBuilder";
import { Pages } from "@/utilities/formBuilder/Pages";

const Page = new Pages();
</script>