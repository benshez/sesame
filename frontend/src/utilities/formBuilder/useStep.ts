import type { IPage, IStep } from "@/interfaces/formBuilder";
import { usePage } from "./usePage";

// export const useStep = async (tenantId: string) => {
//   const page = usePage(tenantId);
//   const steps = await page.GetPage() as IPage;

//   const GetStep = (): IStep => {
//     return (`step-${page.name}-${page.currentStepIndex}`) as unknown as IStep;
//   }

//   return {
//     GetStep
//   }
// }