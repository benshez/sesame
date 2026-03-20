<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="overflow-hidden rounded-2xl border px-5 p-5 col-span-12 xl:col-span-4">
      <slot name="form-body-left"></slot>
    </div>

    <div class="overflow-hidden rounded-2xl border px-5 p-5 col-span-12 xl:col-span-8">
      <slot name="form-body-right"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>