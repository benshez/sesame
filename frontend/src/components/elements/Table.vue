<template>
  <div class="rounded-bl-2xl rounded-br-2xl p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
    <div class="space-y-5">
      <div
        class="rounded-2xl overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <th v-for="(column, columnKey) in props.columns" :key="columnKey"
                  class="px-1 py-2 text-left w-3/11 sm:px-3">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">{{ column.caption }}</p>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex"
                class="border-t border-gray-100 dark:border-gray-800">
                <td v-for="(column, columnIndex) in props.columns" :key="columnIndex"
                  class="px-1 py-2 sm:px-3 whitespace-nowrap">
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