import { type Component } from "vue";
import type { ITableRowElement } from "./";

export interface ITableRow {
  values?: Array<string | Component | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement | ITableRowElement>;
  rowData?: Record<string, any>;
  props?: Array<Record<string, any>>;
}