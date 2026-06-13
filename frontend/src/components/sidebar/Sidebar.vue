<template>
  <Transition enter-from-class="translate-x-[-100%]" enter-active-class="transition-transform duration-300 ease-in-out"
    enter-to-class="translate-x-0" leave-from-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out" leave-to-class="translate-x-[-100%]">
    <aside ref="sideBar" v-if="displayStore.displayState.sidebarShowing"
      class="show-sidebar-trigger fixed left-0 top-0 h-full w-64 z-50 border-r xl:relative px-5 py-5">
      <div class="flex flex-col gap-4 mt-15">
        <ul class="flex flex-col gap-1">
          <li v-for="(item, itemIndex) in displayStore.displayState.siderbarMenuItems" :key="itemIndex">
            <button @click="OntoggleItem(item)"
              class="show-sidebar-trigger menu-item group w-full menu-item-inactive xl:justify-start transition">
              <span class="show-sidebar-trigger menu-item-icon-inactive">
                <svg v-if="item.icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" :d="item.icon" fill="currentColor">
                  </path>
                </svg>
              </span>
              <span class="show-sidebar-trigger menu-item-text flex items-center gap-2">
                {{ item.text }}
              </span>
              <svg v-if="item.children" :class="item.isOpen ? 'rotate-180' : 'rotate-0'" width="20" height="20"
                viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="show-sidebar-trigger ml-auto w-5 h-5 transition-transform duration-200">
                <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round">
                </path>
              </svg>
            </button>
            <Transition name="slide">
              <div class="show-sidebar-trigger" v-if="item.isOpen && item.children">
                <ul class="show-sidebar-trigger mt-2 space-y-1 ml-9">
                  <li class="show-sidebar-trigger" v-for="(child, childIndex) in item.children" :key="childIndex">
                    <button @click="OnRouteClick(child)"
                      :class="{ 'menu-item group w-full menu-item-inactive lg:justify-start show-sidebar-trigger': true, 'menu-item group w-full lg:justify-start menu-dropdown-item-active show-sidebar-trigger': child?.isActive }">
                      <span class="menu-item-text show-sidebar-trigger">
                        <svg class="menu-item-text show-sidebar-trigger" v-if="child.icon" width="24" height="24"
                          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="menu-item-text show-sidebar-trigger" fill-rule="evenodd" clip-rule="evenodd"
                            :d="child.icon" fill="currentColor">
                          </path>
                        </svg>
                      </span>
                      <span class="menu-item-text show-sidebar-trigger">
                        {{ child.text }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useDisplayStore } from "@/store/display/useDisplayStore";
import { useRouter, useRoute } from "vue-router";
import { configuration } from "@/utilities";
import * as Session from "supertokens-web-js/recipe/session";
import type { IMenuOption } from "@/interfaces";

const displayStore = useDisplayStore();
const router = useRouter();
const route = useRoute();
const userId = ref<string | null>(null);
const tenantId = ref<string | null>(null);

const OntoggleItem = (item: IMenuOption) => {
  displayStore.UpdateOpenMenuItemState(item)
};

const OnRouteClick = (menuItem: IMenuOption) => {
  router.getRoutes().forEach(route => {
    if (route.name === menuItem.link) {
      let toRoute = route.path;

      if (toRoute.includes(":tenantId")) {
        toRoute = toRoute.replace(":tenantId", tenantId.value as string)
      }

      if (route.path.includes(":userId")) {
        toRoute = toRoute.replace(":userId", userId.value as string)
      }

      router.push(toRoute);
    }
  })
}

onMounted(async () => {
  if (await Session.doesSessionExist()) {
    userId.value = await Session.getUserId();
    tenantId.value = localStorage.getItem("tenantId") ?? "public";
  }
  await displayStore.InitializeMenuOptions();
});
</script>