export interface ILongLat {
  longitude: number,
  latitude: number
}

export interface ICoordinates {
  start: ILongLat,
  end: ILongLat,
  distance: number
}