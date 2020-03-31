import { Booking } from "../../common/class/Booking";
import { Resource } from "../../common/class/Resource";

export interface ResourceStore {
  resource?: Resource;
  bookings?: Booking[];
}
