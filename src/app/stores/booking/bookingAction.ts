import { Dispatch } from "react";
import { Booking } from "../../common/class/Booking";
import { BookingData } from "../../common/class/BookingData";
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
    if (state.user && state.user.token) {
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
    if (state.user && state.user.token) {
      const token = state.user.token;
      dispatch({ type: "DELETE_BOOKING" });
      axiosInstance
        .delete(`${bookingsUrl}/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(r => r.data)
        .then(() => {
          dispatch({ type: "RECEIVE_DELETE_BOOKING", payload: bookingId });
        })
        .catch(e => {
          dispatch({ type: "ERROR_DELETE_BOOKING" });
        });
    } else {
      dispatch({ type: "ERROR_GET_BOOKINGS" });
    }
  };
};

interface CreateBookingAction {
  readonly type: "CREATE_BOOKING";
}

interface ReceiveCreateBookingAction {
  readonly type: "RECEIVE_CREATE_BOOKING";
}

interface ErrorCreateBookingAction {
  readonly type: "ERROR_CREATE_BOOKING";
}

export const createBooking = (bookingData: BookingData) => {
  return (dispatch: Dispatch<BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user && state.user.token) {
      const token = state.user.token;
      dispatch({ type: "CREATE_BOOKING" });
      axiosInstance
        .post(bookingsUrl, bookingData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(r => r.data)
        .then(json => {
          dispatch({ type: "RECEIVE_CREATE_BOOKING" });
          getBookings()(dispatch, getState);
        })
        .catch(e => {
          dispatch({ type: "ERROR_CREATE_BOOKING" });
        });
    } else {
      dispatch({ type: "ERROR_CREATE_BOOKING" });
    }
  };
};

export type BookingAction =
  | GetBookingsAction
  | ReceiveBookingsAction
  | ErrorBookingsAction
  | DeleteBookingAction
  | ReceiveDeleteBookingAction
  | ErrorDeleteBookingAction
  | CreateBookingAction
  | ReceiveCreateBookingAction
  | ErrorCreateBookingAction;
