import moment from "moment";
import { Booking } from "../class/Booking";

export function isRoomOccupied(bookings: Booking[]): boolean {
  if (bookings.length === 0) {
    return false;
  } else {
    const now = moment();
    for (let booking of bookings) {
      if (booking.start && booking.end && now.isAfter(booking.start) && now.isBefore(booking.end)) {
        return true;
      }
    }
  }
  return false;
}
