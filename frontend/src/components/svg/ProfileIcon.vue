<template>
    <svg class="absolute w-22 h-22 text-body-subtle -left-1" fill="currentColor" viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
      </path>
    </svg>
</template>
<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  Size: {
    type: String,
    default: "medium"
  }
})

const { Size } = toRefs(props);
</script>