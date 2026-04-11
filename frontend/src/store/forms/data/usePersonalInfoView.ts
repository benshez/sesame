import type { IElement, IPage } from "@/interfaces";

export const usePersonalInfoView = () => {
  const PersonalInfoView  = {
    "name": "personalInfo",
    "heading": "Personal Information",
    "path": "/personalInfo",
    "requiresAuthenticaton": true,
    "elements": [
      {
        "id": "displayName",
        "label": "Display name",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter Display name.",
        "placeholderText": "Display name",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": [],
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          return true;
        },
        "type": "email",
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      },
      {
        "id": "firstName",
        "label": "First name",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your first name.",
        "placeholderText": "Name",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          return true;
        },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      },
      {
        "id": "surname",
        "label": "Surname",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your Surname.",
        "placeholderText": "Surname",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "position",
        "label": "Position",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your position.",
        "placeholderText": "Position",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "unit",
        "label": "Unit number",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your unit number.",
        "placeholderText": "Unit number",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "streetNumber",
        "label": "Street number",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your street number.",
        "placeholderText": "Street number",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "streetName",
        "label": "Street name",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your street name.",
        "placeholderText": "Street name",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "suburb",
        "label": "Suburb",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your suburb.",
        "placeholderText": "Suburb",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "city",
        "label": "City",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your city.",
        "placeholderText": "City",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "state",
        "label": "State",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your state.",
        "placeholderText": "State",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "postalCode",
        "label": "Postal code",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your postal code.",
        "placeholderText": "Postal code",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },
      {
        "id": "country",
        "label": "Country",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your Country.",
        "placeholderText": "Country",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => { return true },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => { return true; },
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      },      
    ]
  } as IPage

  const GetElements = (): Array<IElement> => {
    return PersonalInfoView .elements;
  }
  const GetElement = (key: string): IElement => {
    const element: IElement = GetElements().filter((e: IElement) => { 
            if (e.id === key) return e as IElement;;
    }) as unknown as IElement;

    return element;
  }
  return {
    PersonalInfoView ,
    GetElements
  }
}