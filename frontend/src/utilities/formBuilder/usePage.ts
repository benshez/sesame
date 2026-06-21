import { useRoute } from "vue-router";
import type { IPage } from "@/interfaces/formBuilder";

export const usePage = async (tenantId: string) => {
  const route = useRoute();
  const pageName: string = route.params.name.toString();

  const GetPage = async (): Promise<IPage> => {
    return await `page-${pageName}` as unknown as Promise<IPage>;
  }

  return {
    GetPage
  }
}