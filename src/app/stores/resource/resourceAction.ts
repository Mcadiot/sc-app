import { Dispatch } from "react";
import { Resource } from "../../common/class/Resource";
import { axiosInstance } from "../axios";
import { BookingAction, getBookings } from "../booking/bookingAction";
import { resourceUrl } from "../constants";

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
  return (dispatch: Dispatch<ResourceAction | BookingAction>, getState: Function) => {
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

export type ResourceAction = GetResourceAction | ReceiveResourceAction | ErrorResourceAction;
