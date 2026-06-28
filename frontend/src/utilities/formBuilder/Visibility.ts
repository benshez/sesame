import type { IField, IKeyValue } from "@/interfaces/formBuilder";

export class Visibility {

  constructor() { }

  IsVisible = async (Element: IField): Promise<boolean> => {
    const IsVisibleIfs: Array<IKeyValue> = Element.IsVisibleIf as Array<IKeyValue>;
    const IsObject: boolean = typeof IsVisibleIfs === "object" || false;
    const HasItems: boolean = IsVisibleIfs.length !== 0;
    let Visible: boolean = true;

    if (!IsObject || !HasItems) return Visible;

    for (const IsVisibleIf of IsVisibleIfs) {
      const Keys: Array<string> = Array.isArray(IsVisibleIf.Key) ? IsVisibleIf.Key : [IsVisibleIf.Key] as Array<string>;
      const Values: Array<string> = Array.isArray(IsVisibleIf.Value) ? IsVisibleIf.Value : [IsVisibleIf.Value] as Array<string>;

      for (const Key of Keys) {
        const Index = Keys.indexOf(Key) | 0;
        const Value = Values[Index];

        switch (Key.toString().toLowerCase()) {
          case "class":
            const Method = Reflect.get(this, Value);
            const IsFunction = typeof Method === "function";

            if (IsFunction) {
              const Visible = await Method.call(this, Element);
              return Visible;
            }

            break;
          default:
            if (Element.IsValid && (Element.Value === Key || (Element.Value !== "" && Key === "*"))) {
              Visible = true;
              return Visible;
            }

            break;
        }
      }
    }

    return Visible;
  }

  IsVisibleWhen = () => {
    
  }
}