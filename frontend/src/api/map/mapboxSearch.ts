import { ApiClient } from "@/plugins";
import type { MapboxDirections } from "@/interfaces";

class MapboxSearch {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient('', 'en');
   }

  GetDirections = async (profile: string, coordinates: Array<Array<number>>): Promise<MapboxDirections> => {
    const response = await this.apiClient.mapbox().getDirections(profile, coordinates);

     return await response.data as MapboxDirections;
  }
}

export const mapboxSearch = new MapboxSearch();