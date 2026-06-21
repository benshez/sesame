<template>
  <FormElement :element="element">
    <template #component v-if="element.component">
      <div class="field-checkbox">
        <InputSwitch v-if="!element.readonly" v-model="element.value" :id="element.id" :class="element.cssClass"
          @input="handleInput(page.steps, element)" />
      </div>
    </template>
    <template #help>
      <small :id="`${element.id}-help`" v-if="element.helpText" class="inline-block">{{ element.helpText }}</small>
    </template>
  </FormElement>
</template>
<script lang="ts" setup>
import InputSwitch from 'primevue/inputswitch'
import FormElement from '~~/components/FormBuilder/components/FormElement.vue';
import { useFormBuilderComponent } from '~~/components/FormBuilder/components/useFormBuilderComponent'
import { ElementProps } from '~~/components/FormBuilder/components/props/Props'

const page = usePage()
const props = defineProps({
  ...ElementProps,
})
const { handleInput } = useFormBuilderComponent()
</script>