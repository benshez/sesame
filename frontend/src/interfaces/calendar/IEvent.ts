export interface IEvent {
  id: string,
  title: string,
  start: string,
  end?: string,
  allDay?: boolean,
  organisationId?: string | number,
  extendedProps?: {
    calendar: string
  },
}