import { Dispatch } from "react";
import { Booking } from "../../common/class/Booking";
import { Resource } from "../../common/class/Resource";
import { axiosInstance } from "../axios";
import { bookingsUrl, resourceUrl } from "../constants";

interface GetResourceAction {
  readonly type: "GET_RESOURCE";
}

interface ReceiveResourceAction {
  readonly type: "RECEIVE_GET_RESOURCE";
  readonly payload: Resource;
}

interface ErrorResourceAction {
  readonly type: "ERROR_GET_RESOURCE";
}

export const getResource = () => {
  return (dispatch: Dispatch<ResourceAction>, getState: Function) => {
    const state = getState();
    if (state.user) {
      const token = state.user.token;
      dispatch({ type: "GET_RESOURCE" });
      axiosInstance
        .get(resourceUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(r => r.data)
        .then(json => {
          var data: Resource = json.data;
          dispatch({ type: "RECEIVE_GET_RESOURCE", payload: data });
          getBookings()(dispatch, getState);
        })
        .catch(e => {
          dispatch({ type: "ERROR_GET_RESOURCE" });
        });
    } else {
      dispatch({ type: "ERROR_GET_RESOURCE" });
    }
  };
};

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
  return (dispatch: Dispatch<ResourceAction>, getState: Function) => {
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

export type ResourceAction =
  | GetResourceAction
  | ReceiveResourceAction
  | ErrorResourceAction
  | GetBookingsAction
  | ReceiveBookingsAction
  | ErrorBookingsAction;
