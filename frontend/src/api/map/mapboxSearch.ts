import { api } from "@/plugins";
import { configuration } from "@/utilities";
import type { MapboxDirections } from "@/interfaces";

class MapboxSearch {
  constructor() { }

  GetDirections = async (profile: string, coordinates: Array<Array<number>>): Promise<MapboxDirections> => {
    const response = await api.get<unknown>(`https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates[0]};${coordinates[1]}?steps=true&geometries=geojson&access_token=${configuration.GetMapboxToken()}`);

     return await response.data as MapboxDirections;
  }
}

export const mapboxSearch = new MapboxSearch();