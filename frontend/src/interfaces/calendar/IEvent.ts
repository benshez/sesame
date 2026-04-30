import type { DateTime } from "ts-luxon";

export interface IEvent {
  allDay?: boolean,
  allow?: boolean | string,
  backgroundColor?: string,
  classNames?: [],
  constraints?: string,
  display?: string,
  durationEditable?: boolean | string,
  end?: Date,
  endStr?: string,
  extendedProps?: {
    calendar: string,
    organisationId?: string | number,
    estimatedAttendance: number | string,
  },
  groupId?: string,
  id: string,
  overlap?: string,
  source?: string,
  start: Date,
  startEditable?: boolean | string,
  startStr?: string,
  textColor?: string,
  title: string,
  url?: string
}