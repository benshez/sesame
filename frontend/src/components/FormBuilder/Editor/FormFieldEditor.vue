<template>
  <div class="rounded-2xl border border-gray-200 dark:border-gray-800 mb-5"
    v-for="(Field, FieldIndex) in Fields" :key="FieldIndex">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        <p class="mb-2 font-semibold"> {{ Field.Label }} </p>
        <p class="text-sm text-gray-500 dark:text-gray-400"> {{ Field.Component }} </p>
      </h3>
    </div>
  </div>
  <button @click="AddField" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
    Add Field
  </button>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import { type IField } from "@/interfaces/formBuilder";

const props = defineProps({
  Fields: {
    type: Object as PropType<IField[]>,
    required: false,
  },
});

const AddField = () => {
  const NewField: IField = {
    Id: "001",
    Label: "New Field",
    Component: "input",
    Value: "",
    HelpText: "Enter your username/email.",
    PlaceholderText: "Username/Email",
    Options: [],
    IsRequired: false,
    IsValid: true,
    IsValidIf: [],
    IsReadonly: false,
    IsVisible: true,
    IsVisibleIf: [],
    CssClass: "",
    Type: "",
    LabelIcon: "",
    Score: []
  };
  if (props.Fields) {
    props.Fields.push(NewField);
  }
}

</script>