<template>
  <h3 class="pt-4 text-2xl text-center">{{props.heading}}</h3>
  <div class="pt-5 pb-5">
    <h3 class="text-center mb-4 font-semibold">{{ props.message }}</h3>
    <div class="grid grid-cols-1 gap-1">
      <Google class="mb-5" />
      <GitHub />
    </div>
  </div>
  <h3 class="text-center font-semibold">Or</h3>

</template>
<script setup lang="ts">
import Google from "@/components/LoginProviders/Google.vue";
import GitHub from "@/components/LoginProviders/GitHub.vue";

const props = defineProps({
  heading: { type: String, required: true },
  message: { type: String, required: true }
})
</script>