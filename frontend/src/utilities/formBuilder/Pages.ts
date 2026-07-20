import type { IField, IFieldset, IKeyValue, IOption, IPage, IPages, IStep } from "@/interfaces/formBuilder";

export class Page implements IPage {
  Name?: string;
  Heading?: string;
  RequiresAuthenticaton?: boolean;
  CurrentStepIndex?: number;
  Score?: number;
  Path?: string;
  Steps?: Array<IStep>;

  constructor(
    Name?: string,
    Heading?: string,
    RequiresAuthenticaton?: boolean,
    CurrentStepIndex?: number,
    Score?: number,
    Path?: string,
    Steps?: Array<IStep>,
  ) {
    this.Name = Name;
    this.Heading = Heading;
    this.RequiresAuthenticaton = RequiresAuthenticaton;
    this.Path = Path;
    this.Steps = Steps;
    this.CurrentStepIndex = CurrentStepIndex;
    this.Score = Score;
  }
}

export class Step implements IStep {
  Label: string;
  StepIndex: number;
  Fieldsets?: Array<IFieldset>;
  StepIcon?: string;
  HasValidationErrors?: boolean;

  constructor(
    Label: string,
    StepIndex: number,
    Fieldsets?: Array<IFieldset>,
    StepIcon?: string,
    HasValidationErrors?: boolean
  ) {
    this.Label = Label;
    this.StepIndex = StepIndex;
    this.Fieldsets = Fieldsets;
    this.StepIcon = StepIcon;
    this.HasValidationErrors = HasValidationErrors;
  }
}

export class Fieldset implements IFieldset {
  Label?: string;
  Description?: string;
  Fields?: Array<IField> | undefined;

  constructor(
    Label?: string,
    Description?: string,
    Fields?: Array<IField> | undefined
  ) {
    this.Label = Label;
    this.Description = Description;
    this.Fields = Fields;
  }
}

export class Field implements IField {
  Component: string;
  Value: string | Array<string>;
  Id?: string;
  Label?: string;
  HelpText?: string;
  PlaceholderText?: string;
  Options?: Object | Array<IOption>;
  IsRequired?: boolean;
  IsValid?: boolean;
  IsValidIf?: Array<IKeyValue> | null;
  IsReadonly?: boolean;
  IsVisible?: boolean;
  IsVisibleIf?: Array<IKeyValue> | null;
  CssClass?: string;
  Type?: string;
  LabelIcon?: string;
  Score?: Array<IKeyValue> | null;

  constructor(
    Component: string,
    Value: string | Array<string>,
    Id?: string,
    Label?: string,
    HelpText?: string,
    PlaceholderText?: string,
    Options?: Object | Array<IOption>,
    IsRequired?: boolean,
    IsValid?: boolean,
    IsValidIf?: Array<IKeyValue> | null,
    IsReadonly?: boolean,
    IsVisible?: boolean,
    IsVisibleIf?: Array<IKeyValue> | null,
    CssClass?: string,
    Type?: string,
    LabelIcon?: string,
    Score?: Array<IKeyValue> | null
  ) {
    this.Component = Component;
    this.Value = Value;
    this.Id = Id;
    this.Label = Label;
    this.HelpText = HelpText;
    this.PlaceholderText = PlaceholderText;
    this.Options = Options;
    this.IsRequired = IsRequired;
    this.IsValid = IsValid;
    this.IsValidIf = IsValidIf;
    this.IsReadonly = IsReadonly;
    this.IsVisible = IsVisible;
    this.IsVisibleIf = IsVisibleIf;
    this.CssClass = CssClass;
    this.Type = Type;
    this.LabelIcon = LabelIcon;
    this.Score = Score;
  }
}

export class Option implements IOption, IKeyValue {
  Key: string | number;
  Value: string;
  Checked?: boolean;

  constructor(
    Key: string | number,
    Value: string,
    Checked?: boolean,
  ) {
    this.Key = Key;
    this.Value = Value;
    this.Checked = Checked;
  }
}

export class KeyValue implements IKeyValue {
  Key: string | number;
  Value: string;

  constructor(
    Key: string | number,
    Value: string,
  ) {
    this.Key = Key;
    this.Value = Value;
  }
}

export class Pages implements IPages {
  Page?: IPage = {};
  Pages?: Array<IPage> = [];

  constructor() { }
}