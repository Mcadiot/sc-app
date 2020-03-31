import { Room } from "../screen/Room";
import Rooms from "../screen/Rooms";
import { roomUrl } from "./routesConstants";

export const routes = [
  {
    path: "",
    component: Rooms
  },
  {
    path: roomUrl,
    component: Room
  }
];
