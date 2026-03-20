<template>
  <FormElement :element="element">
    <template v-slot:label></template>
    <template v-slot:component>
      <div class="relative mt-1">
        <input v-if="!element.isReadonly" v-model="element.value" :id="element.id" :name="element.id"
          :type="element.type" :class="element.cssClass" :placeholder="element.placeholderText"
          @input="handleInput(element.id as string)" />
        <SVGDrawer :svg-path-d="`${element.labelIcon}`" class="absolute w-4 h-4 top-2.5 right-2.5" />
      </div>
    </template>
    <template v-slot:help></template>
  </FormElement>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ElementProps } from "@/components/Form/props/Props";
import FormElement from "@/components/Form/FromElement.vue";
import SVGDrawer from "@/components/SVG/SVGDrawer.vue";
import { useFormStore } from "@/store/forms/formStore";

const route = useRoute();
const props = defineProps({
  ...ElementProps
});

const formStore = useFormStore();

const { handleInput } = useFormStore();
</script>