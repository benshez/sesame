import type { DateTime } from "ts-luxon";

interface DateObject {
  year: number;
  month: number;
  day: number;
}

interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

interface DateTimeObject {
  date: DateObject;
  time: TimeObject;
}

export interface IEvent {
  id: string,
  title: string,
  start: string,
  end?: string,
  allDay?: boolean,
  extendedProps?: {
    calendar: string
  },
}