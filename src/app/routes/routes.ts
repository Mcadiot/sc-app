import Room from "../screen/Room";
import Rooms from "../screen/Rooms";
import { roomsUrl, roomUrl } from "./routesConstants";

export const routes = [
  {
    path: roomUrl,
    component: Room
  },
  {
    path: roomsUrl,
    component: Rooms
  }
];
