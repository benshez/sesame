<template>
  <label :for="`toggle-${id}`" class="relative inline-flex items-center cursor-pointer" :title="title">
    <input :name="`toggle-${id}`" :id="`toggle-${id}`" @click="$emit('toggle')" :checked="checked" type="checkbox"
      value="" class="sr-only peer">
    <div
      class="block h-6 w-11 rounded-full bg-gray-200 dark:bg-white/10 peer-checked:bg-brand-500 peer-checked:dark:bg-brand-500">
    </div>
    <div
      class="translate-x-0 peer-checked:translate-x-full shadow-theme-sm absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white duration-200 ease-linear">
    </div>
  </label>
</template>
<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: false,
  }
});
</script>