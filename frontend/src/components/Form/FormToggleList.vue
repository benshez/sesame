<template>
  <FormElement :element="element">
    <template v-slot:label>
      <label v-if="element.label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"> {{
        element.label }} </label>
    </template>
    <template v-slot:component>
      <div class="relative theme-form-input px-4 py-2.5">
        <div v-if="element.component" :id="element.id" class="flex flex-wrap items-center gap-4 sm:gap-5">
          <div v-if="element.options" v-for="(option, optionIndex) in options" :key="optionIndex" class="n-chk">
            <div :class="`form-check form-check-${option.value} form-check-inline`">
              <div class="flex flex-wrap items-center gap-2">
                <label :for="`toggle-${element.id}-${option.key}`" v-if="option.value"
                  class="cursor-pointer block text-sm font-medium text-gray-700 dark:text-gray-400">
                  {{ option.value }}
                </label>
                <Toggle :id="`${element.id}-${option.key}`"
                  :checked="option.checked || element.value.includes(option.key as string)" :title="option.value"
                  @toggle="onToggle($event, element, option)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:help></template>
  </FormElement>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, inject } from "vue";
import { ElementProps } from "@/components/Form/props/Props";
import FormElement from "@/components/Form/FromElement.vue";
import Toggle from "@/components/elements/Toggle.vue";
import { useFormStore } from "@/store/forms/formStore";
import type { IElement, IOption } from "@/interfaces";

const props = defineProps({
  ...ElementProps
});
const options = ref<Array<IOption>>([]);
const { handleToggleList } = useFormStore();
const onToggled = inject("onItemToggled", (option: string, isChecked: boolean) => { });


const onToggle = (e: Event, element: IElement, option: IOption) => {
  const isChecked = (e.target as HTMLInputElement).checked;

  handleToggleList(element.id as string, option.key as string, isChecked);

  if (onToggled) {
    onToggled(option.key as string, isChecked);
  }
}

onBeforeMount(async () => {
  if (typeof props.element.options === "function") {
    options.value = await props.element.options();
  } else {
    options.value = props.element.options as unknown as Array<IOption>;
  }
})
</script>