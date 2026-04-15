import type { IElement, IPage } from "@/interfaces";
import { useValidators } from "@/utilities";

export const useLoginView = () => {
  const validators = useValidators();

  const LoginView = {
    "name": "auth",
    "heading": "Login",
    "path": "/auth",
    "requiresAuthenticaton": true,
    "elements": [
      {
        "id": "email",
        "label": "Email",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your username/email.",
        "placeholderText": "Username/Email",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": [],
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          const email: IElement = GetElement("email");

          return validators.IsValidEmail(email);
        },
        "type": "email",
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      },
      {
        "id": "password",
        "label": "Password",
        "component": "FormInput",
        "value": "",
        "helpText": "Enter your password.",
        "placeholderText": "Password",
        "isReadonly": false,
        "isVisible": true,
        "isVisibleIf": (): boolean => {
          return true;
        },
        "isRequired": true,
        "isValid": true,
        "isValidIf": (): boolean => {
          const password: IElement = GetElement("password");
          
          return validators.IsMinimunCharacterLength(password, 7);
        },
        "type": "password",
        "cssClass": "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300",
        "labelIcon": "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
      }
    ]
  } as IPage

  const GetElements = (): Array<IElement> => {
    return LoginView.elements;
  }
  const GetElement = (key: string): IElement => {
    const element: IElement = GetElements().find((e: IElement) => {
      if (e.id === key) return e as IElement;
    }) as unknown as IElement;

    return element;
  }
  return {
    useLoginView,
    GetElements
  }
}