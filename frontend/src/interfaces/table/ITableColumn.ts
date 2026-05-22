import { type Component } from "vue";
import type { ITableRowElement } from "./";

export interface ITableColumn {
  id?: string;
  caption: string;
  type: string | Component | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement | ITableRowElement;
}