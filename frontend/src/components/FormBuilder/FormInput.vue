<template>
  <FormElement :element="element">
    <template #component v-if="element.component">
      <InputText v-if="!element.readonly" v-model="element.value" :id="element.id" :class="element.cssClass" @input="handleInput(page.steps, element)"/>
    </template>
  </FormElement>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import FormElement from '~~/components/FormBuilder/components/FormElement.vue';
import { useFormBuilderComponent } from '~~/components/FormBuilder/components/useFormBuilderComponent'
import { ElementProps } from '~~/components/FormBuilder/components/props/Props'

const page = usePage()
const props = defineProps({
  ...ElementProps,
})
const { handleInput } = useFormBuilderComponent()
</script>