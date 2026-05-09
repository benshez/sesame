/*
import type { IResources } from "@/interfaces";

const ValidationMessage = (text: string, args: unknown[] = []) => {
  if (text !== null && args.length > 0) {
    for (var i = 0; i < args.length; i++) {
      text = text.replace('{' + i + '}', args[i] as unknown as string);
    }
  } 8
  return text;
}

const CheckIfEmpty = (value: unknown, required: boolean, messages: IResources) => {
  if (value === '') {
    if (required) {
      return [ValidationMessage(messages.fieldIsRequired)];
    }
    else {
      return [];
    }
  }
  return null;
}

export default { 
  ValidationMessage, 
  CheckIfEmpty 
};
*/