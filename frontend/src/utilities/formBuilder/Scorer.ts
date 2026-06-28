import type { IField, IKeyValue } from "@/interfaces/formBuilder";
import { ApiClient } from "@/plugins/client/ApiClient";

export class Scorer {

  constructor() { }

  GetScore = async (Element: IField): Promise<number> => {
    const Scorers: Array<IKeyValue> = Element.Score as Array<IKeyValue>;
    const IsObject: boolean = typeof Scorers === "object" || false;
    const HasItems: boolean = Scorers.length !== 0;
    let Score: number = 0;

    if (!IsObject || !HasItems) return Score;

    for (const Scorer of Scorers) {
      const Keys: Array<string> = Array.isArray(Scorer.Key) ? Scorer.Key : [Scorer.Key] as Array<string>;
      const Values: Array<string> = Array.isArray(Scorer.Value) ? Scorer.Value : [Scorer.Value] as Array<string>;

      for (const Key of Keys) {
        const Index = Keys.indexOf(Key) | 0;
        const Value = Values[Index];

        switch (Key.toString().toLowerCase()) {
          case "class":
            const Method = Reflect.get(this, Value);
            const IsFunction = typeof Method === "function";

            if (IsFunction) {
              const Result = await Method.call(this, Element);
              return Score += Result;
            }

            break;
          default:
            if (Element.IsValid && (Element.Value === Key || (Element.Value !== "" && Key === "*"))) {
              Score += parseInt(Value as string);
              return Score;
            }

            break;
        }
      }
    }

    return Score;
  }

  CalculateScore = (Element: IField): number => {

    return 0;
  }
}