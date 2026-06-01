<template>
    <FormBody :view="'roles'" :css-class="'p-2'">
    <template v-slot:header>
      <p class="mb-2 font-semibold">
        Edit User Roles
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Update user roles.
      </p>
    </template>
    <template v-slot:content></template>
    <template v-slot:footer="elements">
      <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div class="flex items-center gap-5 lg:justify-end">

        </div>
      </div>
    </template>
  </FormBody>
</template>
<script setup lang="ts">
import FormBody from "@/components/Form/FormBody.vue";

</script>