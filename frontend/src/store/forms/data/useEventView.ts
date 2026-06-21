import type { IElement, IOption, IPage } from "@/interfaces";
import { useValidators } from "@/utilities";
import { ApiClient } from "@/plugins/client/ApiClient";

export const useEventView = () => {
  const apiClient = new ApiClient();
  const validators = useValidators();

  const MapView = {
    "name": "map",
    "heading": "Map",
    "path": "/map",
    "hasValidationErrors": false,
    "requiresAuthenticaton": true,
    "elements": [
      {
        "id": "description",
        "label": "Description",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter Description.",
        "placeholderText": "Description",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => {
          return true;
        },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          const description: IElement = GetElement("description");

          return validators.IsMinimunCharacterLength(description, 3);
        },
        "type": "text",
        "cssClass": "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "organisation",
        "label": "Customer",
        "component": "FormDropdown",
        "value": "",
        "helpText": "Select a Customer.",
        "placeholderText": "Customer",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": [],
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          return true;
        },
        "options": async () => {
          let options: Array<IOption> = [];
          const response: any = await apiClient
            .lookup()
            .organizations();

          response.forEach((organization: any) => {
            options.push({
              key: organization.organization_id,
              value: organization.name
            })
          });

          return options;
        },
        "type": "email",
        "cssClass": "appearance-none dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      },
      {
        "id": "progress",
        "label": "Progress",
        "component": "FormRadioList",
        "value": "",
        "helpText": "Select Progress.",
        "placeholderText": "Progress",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": [],
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          return true;
        },
        "options": async () => {
          let options: Array<IOption> = [];
          const response: any = await apiClient
            .lookup()
            .eventStatuses();

          response.forEach((status: any) => {
            options.push({
              key: status.status_id,
              value: status.name
            })
          });

          return options;
        },
        "type": "email",
        "cssClass": "sr-only form-check-input",
        "labelIcon": "m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      },
      {
        "id": "startDate",
        "label": "Start date",
        "component": "FormCalendar",
        "value": "",
        "helpText": "Enter Start Date.",
        "placeholderText": "Start Date",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => {
          return true;
        },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          return true;
        },
        "type": "",
        "cssClass": "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "endDate",
        "label": "End date",
        "component": "FormCalendar",
        "value": "",
        "helpText": "Enter End Date.",
        "placeholderText": "End Date",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => {
          return true;
        },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          return true;
        },
        "type": "datetime-local",
        "cssClass": "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "distance",
        "label": "Distance",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter Distance.",
        "placeholderText": "Distance",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => {
          return true;
        },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          const distance: IElement = GetElement("distance");
          //const traveled = distance.value.replace("km","");

          return validators.IsMinimunCharacterLength(distance, 3);
        },
        "type": "text",
        "cssClass": "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      }
    ]
  } as IPage

  const GetElements = (): Array<IElement> => {
    return MapView.elements as unknown as Array<IElement>;
  }
  const GetElement = (key: string): IElement => {
    const element: IElement = GetElements().find((e: IElement) => {
      if (e.id === key) return e as IElement;
    }) as unknown as IElement;

    return element;
  }
  return {
    useEventView,
    GetElements
  }
}