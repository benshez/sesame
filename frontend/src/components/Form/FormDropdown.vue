<template>
  <FormElement :element="element">
    <template v-slot:label></template>
    <template v-slot:component>
      <div class="relative mt-1 w-full">
        <select v-if="element.component" v-model="element.value" :id="element.id" :class="element.cssClass"
          @change="handleInput(element.id as string)">
          <option v-if="element.options" v-for="(option, optionIndex) in element.options" :key="optionIndex"
            :value="option.key">{{ option.value }}</option>
        </select>
        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </template>
    <template v-slot:help></template>
  </FormElement>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ElementProps } from "@/components/Form/props/Props";
import FormElement from "@/components/Form/FromElement.vue";
import { useFormStore } from "@/store/forms/formStore";

const route = useRoute();
const props = defineProps({
  ...ElementProps
});

const { handleInput } = useFormStore();
</script>