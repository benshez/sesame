import mapboxgl, { type LngLatLike } from "mapbox-gl";
import { lineString } from "@turf/turf";
import { configuration } from "@/utilities";
import { mapboxSearch } from "@/api";
import type { IMapboxDirections } from "@/interfaces";
import { useFormStore } from "@/store/forms/formStore";

export const useMap = () => {

  const layerId: string = "light-v11";
  let mapbox: unknown;
  let map: mapboxgl.Map;
  let isDrawing: boolean = false;
  let coordinates: Array<Array<number>> = [];
  let mapMarkers: Array<mapboxgl.Marker> = [];

  const MapboxInit = () => {
    const container: HTMLDivElement = document.getElementById("mapContainer") as HTMLDivElement;

    if (mapbox || !container) return;

    while (container.firstChild) {
      container.firstChild.remove();
    }

    mapboxgl.accessToken = configuration.GetMapboxToken();
    mapbox = mapboxgl;
    map = new mapboxgl.Map({
      container: container,
      center: GetGeolocation(),
      style: `mapbox://styles/mapbox/${layerId}`,
      zoom: 12,
      scrollZoom: true,
      boxZoom: true,
      doubleClickZoom: false,
      config: {
        basemap: {
          theme: 'monochrome',
          showPlaceLabels: false,
          showPointOfInterestLabels: false,
          showRoadLabels: false,
          showTransitLabels: false
        }
      },
    });

    map.resize();
  }

  const GetGeolocation = (): LngLatLike => {
    let latitude = -29.85260156155084;
    let longitude = 31.009960218027402;

    if (navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition((position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }, (e) => {
          return [longitude, latitude];
        }, {
          timeout: 50000,
          enableHighAccuracy: true
        });
    }

    return [longitude, latitude];
  }

  const AddMarker = (map: mapboxgl.Map, e) => {

    const el = document.createElement("div");
    el.className = "marker";

    const marker = new mapboxgl.Marker(el)
      .setLngLat(e.lngLat)
      .addTo(map);

    mapMarkers.push(marker);
  }

  const GetWayPointsFromDirections = async (drawData: Array<Array<number>>) => {
    const formStore = useFormStore();
    const directions: IMapboxDirections = await mapboxSearch.GetDirections("driving", drawData);
    const waypoints: Array<Array<number>> = [];
    const firstRoute = directions?.routes[0];

    firstRoute?.geometry.coordinates.forEach((waypoint: any) => {
      waypoints.push(waypoint);
    });

    if (firstRoute) {
      const travelDistance = (firstRoute.distance / 1000);
      formStore.updateElementState("distance", { key: "value", value: `${travelDistance.toFixed(2)}km` });
    }

    return waypoints;
  }


  const onCreateDrawing = async (map: mapboxgl.Map, drawData: Array<Array<number>>) => {
    if (drawData.length > 0) {
      map.addSource("route", {
        type: "geojson",
        data: lineString(await GetWayPointsFromDirections(drawData))
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 8
        }
      });
    }
  }

  const onDeleteDrawing = (map: mapboxgl.Map, drawData: Array<Array<number>>) => {
    const formStore = useFormStore();
    
    if (drawData.length !== 0 && map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    mapMarkers.forEach((marker) => marker.remove());
    coordinates = [];

    formStore.updateElementState("distance", { key: "value", value: "" });
  }

  const ToggleIsDrawing = (draw: boolean) => {
    isDrawing = draw;

    map.off("click", OnMapClicked);

    if (isDrawing) {
      map.on("click", OnMapClicked)
    } 
  }

  const OnClearMapClick = () => {
    onDeleteDrawing(map, coordinates);
  }

  const OnMapClicked = (e) => {
    coordinates.push([e.lngLat.lng, e.lngLat.lat]);
    AddMarker(map, e);
  }

  const OnCalculateDistanceClick = () => {
    map.off("click", OnMapClicked);
    onCreateDrawing(map, coordinates);
  }

  return {
    MapboxInit,
    ToggleIsDrawing,
    OnCalculateDistanceClick,
    OnClearMapClick
  }
}