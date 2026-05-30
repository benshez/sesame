<template>
  <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">{{ header }}</h3>
    </div>
    <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <div class="space-y-5">
        <div class="overflow-hidden rounded-xl bg-white dark:border-gray-800 dark:bg-white/3">
          <div
            class="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/5 rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">&nbsp;</div>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">&nbsp;</div>
          </div>
          <div class="max-w-full overflow-x-auto custom-scrollbar">
            <table class="w-full min-w-full">
              <thead>
                <tr class="border-b border-gray-100 dark:border-gray-800">
                  <th v-for="(column, columnKey) in props.columns" :key="columnKey"
                    class="px-4 py-3 border border-gray-100 dark:border-white/5 text-left">
                    <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">{{ column.caption }}</p>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex"
                  class="border-t border-gray-100 dark:border-white/5">
                  <td v-for="(column, columnIndex) in props.columns" :key="columnIndex"
                    class="px-4 py-3 border border-gray-100 dark:border-white/5">
                    <span v-if="IsString(column)"
                      class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ row.values?.[columnIndex] }}
                    </span>
                    <span v-if="IsComponent(column)"
                      class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      <component :is="column.type" v-bind="row.props?.[columnIndex]"
                        @toggle="$emit('toggle', row.rowData)" @edit-clicked="$emit('edit-clicked', row.rowData)"
                        @delete-clicked="$emit('deleteClicked', row.rowData)" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/5">
            <div
              class="flex flex-col gap-2 border-gray-100 dark:border-white/5 rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3">
                <p
                  class="text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                  
                </p>
              </div>
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button v-if="loadMoreButtonVisible" @click="$emit('get-more-clicked')"
                  class="ml-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                  Load more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ITableColumn, ITableRow } from "@/interfaces";
const html = ref("<pre><code>let a = 'foo';</code></pre>");

const IsComponent = (column: ITableColumn): boolean => {
  return typeof column.type === "object";
}
const IsString = (column: ITableColumn): boolean => {
  return column.type === String;
}

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: false,
    default: ""
  },
  loadMoreButtonVisible: {
    type: Boolean,
    required: false,
    default: false
  },
  subHeader: {
    type: String,
    required: false,
    default: ""
  },
  columns: {
    type: Array<ITableColumn>,
    required: true
  },
  rows: {
    type: Array<ITableRow>,
    required: true
  }
});
</script>