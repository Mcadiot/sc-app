import { Dispatch } from "react";
import { Booking } from "../../common/class/Booking";
import { BookingData } from "../../common/class/BookingData";
import { axiosInstance } from "../Axios";
import { bookingsUrl } from "../Constants";
import { displayError, displayTokenError, performIfTokenValid } from "../StoreUtils";
import { ExpireToken } from "../user/UserAction";

interface GetBookingsAction {
  readonly type: "GET_BOOKINGS";
}

interface ReceiveBookingsAction {
  readonly type: "RECEIVE_GET_BOOKINGS";
  readonly payload: Booking[];
}

export const getBookings = () => {
  return (dispatch: Dispatch<BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user && state.user.token) {
      const token = state.user.token;
      const expirationDate = state.user.tokenExpirationDate;
      performIfTokenValid(expirationDate, dispatch, () => {
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
            displayError(e);
          });
      });
    } else {
      displayTokenError();
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

export const deleteBooking = (bookingId: string) => {
  return (dispatch: Dispatch<BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user && state.user.token) {
      const token = state.user.token;
      const expirationDate = state.user.tokenExpirationDate;

      performIfTokenValid(expirationDate, dispatch, () => {
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
            displayError(e);
          });
      });
    } else {
      displayTokenError();
    }
  };
};

interface CreateBookingAction {
  readonly type: "CREATE_BOOKING";
}

interface ReceiveCreateBookingAction {
  readonly type: "RECEIVE_CREATE_BOOKING";
}

export const createBooking = (bookingData: BookingData) => {
  return (dispatch: Dispatch<BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user && state.user.token) {
      const token = state.user.token;
      const expirationDate = state.user.tokenExpirationDate;

      performIfTokenValid(expirationDate, dispatch, () => {
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
            displayError(e);
          });
      });
    } else {
      displayTokenError();
    }
  };
};

export type BookingAction =
  | GetBookingsAction
  | ReceiveBookingsAction
  | DeleteBookingAction
  | ReceiveDeleteBookingAction
  | CreateBookingAction
  | ReceiveCreateBookingAction
  | ExpireToken;
