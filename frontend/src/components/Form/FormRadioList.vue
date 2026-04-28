<template>
  <FormElement :element="element">
    <template v-slot:label></template>
    <template v-slot:component>
      <div class="relative mt-1 w-full">
        <div v-if="element.component" :id="element.id"
          class="flex flex-wrap items-center gap-4 sm:gap-5">
          <div v-if="element.options" v-for="(option, optionIndex) in options" :key="optionIndex" class="n-chk">
            <div :class="`form-check form-check-${option.value} form-check-inline`">
              <label class="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                :for="`id-${element.id}-${option.key.toString()}`">
                <span class="relative">
                  <input type="radio" :name="`name-${element.id}-${option.key.toString()}`" v-model="element.value" :value="option.key" :id="`id-${element.id}-${option.key.toString()}`"
                    class="sr-only form-check-input" />
                  <span
                    class="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                    <span class="w-2 h-2 bg-white rounded-full dark:bg-transparent"></span>
                  </span>
                </span>
                {{ option.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:help></template>
  </FormElement>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { ElementProps } from "@/components/Form/props/Props";
import FormElement from "@/components/Form/FromElement.vue";
import { useFormStore } from "@/store/forms/formStore";
import type { IOption } from "@/interfaces";

const route = useRoute();
const props = defineProps({
  ...ElementProps
});
const options = ref<Array<IOption>>([]);
const { handleInput } = useFormStore();

onBeforeMount(async () => {
  if (typeof props.element.options === "function") {
    options.value = await props.element.options();
  } else {
    options.value = props.element.options as unknown as Array<IOption>;
  }
})
</script>