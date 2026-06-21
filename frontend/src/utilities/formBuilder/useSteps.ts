import type { IStep } from "@/interfaces/formBuilder";
import { usePage } from "./usePage";

// export const useSteps = (tenantId: string) => {
//   const page = usePage(tenantId).GetPage();

//   const GetSteps = (): Array<IStep> => {
//     return `steps-${page.name}` as unknown as Array<IStep>;
//   }

//   return {
//     GetSteps
//   }
// }