<template>
  <div class="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark"
    v-for="(Page, PageIndex) in Pages.Pages" :key="PageIndex">
    <div class="border-b border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4">
      <div class="px-6 py-5">
        <h3 class="text-base font-medium text-gray-800 dark:text-white/90 mb-2">
          {{ Page.Heading }}
        </h3>
      </div>
    </div>

    <div class="border-b border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4 col-span-2">
      <div v-for="(value, key) in Page" :key="key">
        <div class="relative px-6 py-5" v-if="typeof value === 'string'">
          <label :for="`page-${key.replace(/\//g, '').toLocaleLowerCase()}`"
            class="absolute left-7 top-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Page {{ key }}
          </label>
          <input :id="`page-${key.replace(/\//g, '').toLocaleLowerCase()}`" :name="`page-${key.replace(/\//g, '').toLocaleLowerCase()}`"
            type="input" :placeholder="`Supply page ${key.toLocaleLowerCase()}.`"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent mt-6 px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            v-model="Page[key]" />
        </div>
      </div>
      <FormStepEditor :Steps="Page.Steps" />
            
    </div>
  </div>
  <div class="flex justify-between px-6 py-5">
    <button @click="AddPage"
      class="select-none inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
      Add Page
    </button>
  </div>
</template>
<script setup lang="ts">
import { type PropType, watch, ref, onMounted } from "vue";
import { type IPages, type IPage } from "@/interfaces/formBuilder";
import FormStepEditor from "./FormStepEditor.vue";


const props = defineProps({
  Pages: {
    type: Object as PropType<IPages>,
    required: true,
  },
});

/*
  Name?: string;
  Heading?: string;
  RequiresAuthenticaton?: boolean;
  Path?: string;
  Steps?: Array<IStep>;
  CurrentStepIndex?: number;
  Score?: number;
 */


const AddPage = () => {
  const NewPage: IPage = {
    Name: "",
    Heading: "",
    Path: "",
    RequiresAuthenticaton: false,
    CurrentStepIndex: 0,
    Score: 0,
    Steps: [],
  };
  if (props.Pages.Pages) {
    props.Pages.Pages.push(NewPage);
  }

};



// watch(props.Pages, (newId, oldId) => {
//   console.log(`PagesMaintenance changed from ${JSON.stringify(oldId)} to ${JSON.stringify(newId)}`);
// })

</script>