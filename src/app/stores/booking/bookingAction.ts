import { Dispatch } from "react";
import { Booking } from "../../common/class/Booking";
import { axiosInstance } from "../axios";
import { bookingsUrl } from "../constants";

interface GetBookingsAction {
  readonly type: "GET_BOOKINGS";
}

interface ReceiveBookingsAction {
  readonly type: "RECEIVE_GET_BOOKINGS";
  readonly payload: Booking[];
}

interface ErrorBookingsAction {
  readonly type: "ERROR_GET_BOOKINGS";
}

export const getBookings = () => {
  return (dispatch: Dispatch<BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user) {
      const token = state.user.token;
      dispatch({ type: "GET_BOOKINGS" });
      axiosInstance
        .get(bookingsUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(r => r.data)
        .then(json => {
          var data: Booking[] = [];
          for (let booking of json.data) {
            data.push(new Booking(booking));
          }
          dispatch({ type: "RECEIVE_GET_BOOKINGS", payload: data });
        })
        .catch(e => {
          dispatch({ type: "ERROR_GET_BOOKINGS" });
        });
    } else {
      dispatch({ type: "ERROR_GET_BOOKINGS" });
    }
  };
};

interface DeleteBookingAction {
  readonly type: "DELETE_BOOKING";
}

interface ReceiveDeleteBookingAction {
  readonly type: "RECEIVE_DELETE_BOOKING";
  readonly payload: string;
}

interface ErrorDeleteBookingAction {
  readonly type: "ERROR_DELETE_BOOKING";
}

export const deleteBooking = (bookingId: string) => {
  return (dispatch: Dispatch<BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user) {
      const token = state.user.token;
      dispatch({ type: "DELETE_BOOKING" });
      axiosInstance
        .get(`${bookingsUrl}/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(r => r.data)
        .then(json => {
          var data = json.data.id;
          dispatch({ type: "RECEIVE_DELETE_BOOKING", payload: data });
        })
        .catch(e => {
          dispatch({ type: "ERROR_DELETE_BOOKING" });
        });
    } else {
      dispatch({ type: "ERROR_GET_BOOKINGS" });
    }
  };
};

export type BookingAction =
  | GetBookingsAction
  | ReceiveBookingsAction
  | ErrorBookingsAction
  | DeleteBookingAction
  | ReceiveDeleteBookingAction
  | ErrorDeleteBookingAction;
