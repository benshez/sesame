import { configuration } from "@/utilities";
import type { IMapboxDirections } from "@/interfaces";

class MapboxSearch {
  constructor() {

  }

  GetDirections = async (profile: string, coordinates: Array<Array<number>>): Promise<IMapboxDirections> => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates[0]};${coordinates[1]}?steps=true&geometries=geojson&access_token=${configuration.GetMapboxToken()}`);

    return await response.json() as IMapboxDirections;
  }
}

export const mapboxSearch = new MapboxSearch();