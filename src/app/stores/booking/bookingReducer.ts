import { sortBooking } from "../../common/utils/bookingUtils";
import { BookingAction } from "./bookingAction";
import { BookingStore } from "./bookingStore";

export const bookingReducer = (bookingStore: BookingStore, action: BookingAction): BookingStore => {
  switch (action.type) {
    case "RECEIVE_GET_BOOKINGS":
      return { ...bookingStore, bookings: sortBooking(action.payload) };
    default:
      if (bookingStore === undefined) {
        return {};
      } else {
        return bookingStore;
      }
  }
};
