export const useObjectHelper = () => {
  const r = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

  const ToTitleCase = (str: string) => {
    if (str) {
      return str.match(r)
        ?.map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return "";
  }

  const GetProperty = <T>(object: T, value: string) => {
    return value.split(".").reduce((acc: any, curr: any) => acc && acc[curr]!=="" ? acc[curr] : "", object);
  }

  const SetProperty = <T>(object: T, path: string, value: any): T => {
    const [head, ...rest] = path.split(".");
    return {
      ...object,
      [head]: rest.length
        ? SetProperty(object[head as keyof T], rest.join("."), value)
        : value
    };
  }

  const ToArray = <T>(object: Record<string, any>): Array<T> => {
    let result: Array<T> = [];

    Object.entries(object).map(([key, value]) => {
      const entry: T = {
        key: ToTitleCase(key),
        value: value as string
      } as T;
      result.push(entry as T);
    })

    return result;
  }

  const Flatten = (object: Record<string, any>, results: Record<string, any>): Record<string, any> => {
    let result: Record<string, any> = results || {};

    Object.keys(object).forEach((key) => {
      const value = object[key];

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, Flatten(value, {}))
      } else {
        result[key] = value
      }
    })

    return result;
  }

  return {
    GetProperty,
    SetProperty,
    ToArray,
    Flatten
  }
}