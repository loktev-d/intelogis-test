import axios from "axios";
import config from "./config.json";

export async function fetchRoute(startPoint, endPoint) {
  return await axios.get(
    `${config.routingApiUrl}${startPoint[0]},${startPoint[1]};${endPoint[0]},${endPoint[1]}?geometries=geojson&access_token=${config.routingApiToken}`
  );
}
