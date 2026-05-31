import type { IElement, IOption, IPage } from "@/interfaces";
import { useValidators } from "@/utilities";
import { useRoleStore, useUserStore } from "@/store";

export const useRoleView = () => {
  const validators = useValidators();
  const roleStore = useRoleStore();
  const userStore = useUserStore();

  const RoleView = {
    "name": "role",
    "heading": "Roles",
    "path": "/roles",
    "hasValidationErrors": false,
    "requiresAuthenticaton": true,
    "elements": [
      {
        "id": "role",
        "label": "Role",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter a role.",
        "placeholderText": "Role",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": [],
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          const role: IElement = GetElement("role");

          return !validators.IsEmpty(role);
        },
        "type": "text",
        "cssClass": "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      },
      {
        "id": "permissions",
        "label": "Role permissions",
        "component": "FormToggleList",
        "value": "",
        "helpText": "Select permissions.",
        "placeholderText": "Permissions",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => {
          return true;
        },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          const permissions: IElement = GetElement("permissions");

          return validators.IsMinimunCharacterLength(permissions, 7);
        },
        "options": [
          {
            key: "read",
            value: "Read",
            checked: false
          },
          {
            key: "write",
            value: "Write",
            checked: false
          },
          {
            key: "delete",
            value: "Delete",
            checked: false
          },
        ],
        "cssClass": "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      }
    ]
  } as IPage

  const GetElements = (): Array<IElement> => {
    return RoleView.elements;
  }
  const GetElement = (key: string): IElement => {
    const element: IElement = GetElements().find((e: IElement) => {
      if (e.id === key) return e as IElement;
    }) as unknown as IElement;

    return element;
  }
  return {
    useRoleView,
    GetElements
  }
}