<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] col-span-12 xl:col-span-6 xl:col-start-5 xl:col-end-9">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        <slot name="header"></slot>
      </h3>
    </div>
    <slot name="subheader"></slot>
    <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <div class="space-y-5">
        <div class="space-y-6">
          <div>
            <slot name="content">
              <FormBuilder :elements="elements" :class="props.cssClass"/>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <slot name="footer" :elements="elements"></slot>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { toRefs } from "vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import { useFormStore } from "@/store/forms/formStore";

const props = defineProps({
  view: { 
    type: String, 
    required: false,
    default: ""
  }, 
  cssClass: {
    type: String, 
    required: false,
    default: ""  
  }
})

const formStore = useFormStore();
const route = useRoute();
const routeName: string = props.view?.toString() ? props.view : route.name?.toString() || "";

formStore.getElements(routeName as string);
const { elements } = toRefs(formStore);
</script>