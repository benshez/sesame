<template>
  <div  class="w-full" v-if="page">
    <h1>{{ page.heading }}</h1>
    <FormStepper />
    <FormBody />
  </div>
</template>
<script lang="ts" setup>
import FormStepper from '~~/components/FormBuilder/components/FormStepper.vue'
import FormBody from '~~/components/FormBuilder/components/FormBody.vue'
const page = await usePage()

</script>
