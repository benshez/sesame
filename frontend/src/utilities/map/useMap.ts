import mapboxgl, { type LngLatLike } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { lineString } from "@turf/turf";
import { configuration } from "@/utilities";
import { mapboxSearch } from "@/api";
import type { MapboxDirections } from "@/interfaces";
import { useFormStore } from "@/store/forms/formStore";

export const useMap = () => {

  const layerId: string = "light-v11";
  let mapbox: unknown;
  let map: mapboxgl.Map;

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
      doubleClickZoom: false
    });

    map.resize();

    AddMapboxDrawControl();
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

  const GetWayPointsFromDirections = async (drawData: any) => {
    const formStore = useFormStore();
    const firstFeature = drawData.features[0];
    const coordinates: Array<Array<number>> = firstFeature.geometry.coordinates as Array<Array<number>>;
    const directions: MapboxDirections = await mapboxSearch.GetDirections("driving", coordinates);
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

  const AddMapboxDrawControl = () => {
    const draw = new MapboxDraw({
      keybindings: true,           // Enable keyboard shortcuts
      boxSelect: true,             // Enable shift+click to select features
      clickBuffer: 2,              // Pixels around click to register feature
      touchEnabled: true,          // Enable touch interactions
      touchBuffer: 25,             // Pixels around touch to register feature
      displayControlsDefault: true,// Show default control buttons
      userProperties: false,
      controls: { line_string: true, trash: true },
      defaultMode: "simple_select"
    });

    onDeleteDrawing(map, draw);

    onCreateDrawing(map, draw);

    map.addControl(draw);
  }

  const onCreateDrawing = (map: mapboxgl.Map, draw: MapboxDraw) => {
    map.on("draw.create", async (e) => {
      const drawData = draw.getAll();

      if (drawData.features.length > 0) {
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
    })
  }

  const onDeleteDrawing = (map: mapboxgl.Map, draw: MapboxDraw) => {
    map.on("draw.delete", async (e) => {
      const data = draw.getAll();
      if (data.features.length === 0) {
        map.removeLayer("route");
        map.removeSource("route");
      }

      setTimeout(() => {
        draw.deleteAll();
      }, 0)
    })
  }

  return {
    MapboxInit
  }
}