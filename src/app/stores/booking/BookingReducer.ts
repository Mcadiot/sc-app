import { sortBooking } from "../../common/utils/BookingUtils";
import { BookingAction } from "./BookingAction";
import { BookingStore } from "./BookingStore";

export const bookingReducer = (bookingStore: BookingStore, action: BookingAction): BookingStore => {
  switch (action.type) {
    case "RECEIVE_GET_BOOKINGS":
      return { ...bookingStore, bookings: sortBooking(action.payload) };
    case "RECEIVE_DELETE_BOOKING":
      const bookings = bookingStore.bookings;
      if (bookings != null && bookings.length > 0) {
        const newBookings = bookings.filter(booking => booking.id !== action.payload);
        return { ...bookingStore, bookings: newBookings };
      }
      return { ...bookingStore };
    default:
      if (bookingStore === undefined) {
        return {};
      } else {
        return bookingStore;
      }
  }
};
