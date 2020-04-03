import { Dispatch } from "react";
import { Resource } from "../../common/class/Resource";
import { axiosInstance } from "../Axios";
import { BookingAction, getBookings } from "../booking/BookingAction";
import { resourceUrl } from "../Constants";
import { displayError, displayTokenError, performIfTokenValid } from "../StoreUtils";
import { ExpireToken } from "../user/UserAction";

interface GetResourceAction {
  readonly type: "GET_RESOURCE";
}

interface ReceiveResourceAction {
  readonly type: "RECEIVE_GET_RESOURCE";
  readonly payload: Resource;
}

export const getResource = () => {
  return (dispatch: Dispatch<ResourceAction | BookingAction>, getState: Function) => {
    const state = getState();
    if (state.user) {
      const token = state.user.token;
      const expirationDate = state.user.tokenExpirationDate;
      performIfTokenValid(expirationDate, dispatch, () => {
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
            displayError(e);
          });
      });
    } else {
      displayTokenError();
    }
  };
};

export type ResourceAction = GetResourceAction | ReceiveResourceAction | ExpireToken;
