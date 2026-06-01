<template>
  <div>
    <div class="fc-toolbar fc-header-toolbar fc-toolbar-ltr mb-2">
      <div class="fc-toolbar-chunk">
        <div class="flex fc-button-group">
          <button :title="`${tab.name} View`" v-for="(tab, tabIndex) in tabs" :key="tabIndex"
            @click="onTabChange(tab.id)"
            :class="{ 'fc-dayGridMonth-button fc-button fc-button-primary': true, 'fc-button-active': activeTab === tab.id }">
            {{ tab.name }}
          </button>
        </div>
      </div>
    </div>
    <keep-alive>
      <div>
        <component :is="activeComponent"></component>
      </div>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { type Component, ref } from "vue";

interface Tab {
  id: string;
  name: string;
  selected: boolean;
  component?: Component
}

interface Props {
  tabs: Array<Tab>;
}

const props = defineProps<Props>();
const emit = defineEmits(["onTabChange"]);
const activeTab = ref<string>(props.tabs[0]?.id || "");
let activeComponent: Component = props.tabs[0]?.component || null as unknown as Component;

const GetActiveTabComponent = () => {
  return props.tabs.find(tab => tab.id === activeTab.value)?.component || null;
}
const onTabChange = (tabId: string) => {
  activeTab.value = tabId;
  activeComponent = GetActiveTabComponent() as unknown as Component;
  emit("onTabChange", tabId);
}
</script>