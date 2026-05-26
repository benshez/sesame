<template>
  <div
    class="rounded-xl flex flex-col gap-4 border-l border-r border-t border-gray-100 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800">
    <div class="min-w-full rounded-xl">
      <div class="rounded-xl overflow-hidden bg-white dark:bg-white/3">
        <div rounded-xl class="flex flex-col gap-4 border-b border-gray-200 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800">
          <div class="flex-shrink-0">
            <h3 class="text-base font-medium text-gray-800 dark:text-white/90">{{ props.header }}</h3>
          </div>
        </div>
        <div class="max-w-full custom-scrollbar overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
              <tr class="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                <th v-for="(column, columnKey) in props.columns" :key="columnKey"
                  class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">{{ column.caption }}</p>
                </th>
              </tr>
            </thead>
            <tbody class="divide-x divide-y divide-gray-200 dark:divide-gray-800">
              <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex" class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                <td v-for="(column, columnIndex) in props.columns" :key="columnIndex"
                  class="p-4 text-sm font-normal whitespace-nowrap text-gray-800 dark:text-white/90">
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
        <div class="border border-t-1.5 border-r-0 border-l-0 rounded-b-xl border-gray-100 dark:border-gray-200 py-4 pl-[18px] pr-4 dark:border-white/5">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div class="flex items-center justify-end gap-0.5 xl:justify-end xl:pt-0">
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