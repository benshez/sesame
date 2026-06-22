import { useUserStore } from "@/store/user/useUserStore";
import { useDisplayStore } from "@/store/display/useDisplayStore";
import { useFormStore } from "@/store/forms/useFormStore";
import { useEventStore } from "@/store/events/useEventStore";
import { useRoleStore } from "@/store/role/useRoleStore";
import { useFormBuilderStore } from "@/store/formBuilder/useFormBuilderStore";

import { useProfileView } from "@/store/forms/data/useProfileView";
import { usePersonalInfoView } from "@/store/forms/data/usePersonalInfoView";
import { useLoginView } from "@/store/forms/data/useLoginView";
import { useRegisterView } from "@/store/forms/data/useRegisterView";
import { useEventView } from "@/store/forms/data/useEventView";
import { useRoleView } from "@/store/forms/data/useRoleView";

export {
  useProfileView,
  usePersonalInfoView,
  useLoginView,
  useRegisterView,
  useEventView,
  useRoleView,
  useFormBuilderStore
}