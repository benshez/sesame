<template>
  <slot name="header">Input States</slot>
  <slot name="content">
  </slot>
  <slot name="footer" :elements="elements"></slot>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { toRefs } from "vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import { useFormStore } from "@/store/forms/formStore";

const formStore = useFormStore();
const route = useRoute();
formStore.getElements(route.name as string)
const { elements } = toRefs(formStore);

</script>