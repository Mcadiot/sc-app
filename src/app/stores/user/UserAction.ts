import { Dispatch } from "react";
import { DataLogin } from "../../common/class/DataLogin";
import { UserInfo } from "../../common/class/UserInfo";
import { UserName } from "../../common/class/UsersNames";
import { axiosInstance } from "../Axios";
import { loginUrl, logoutUrl, meUrl, userUrl } from "../Constants";
import { displayError, displayTokenError, performIfTokenValid } from "../StoreUtils";

interface LoginAction {
  readonly type: "LOGIN";
}

interface ReceiveLoginAction {
  readonly type: "RECEIVE_LOGIN";
  readonly payload: DataLogin;
}

export const login = () => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: "LOGIN" });
    axiosInstance
      .get(loginUrl)
      .then(r => r.data)
      .then(json => {
        var data: DataLogin = json.data;
        dispatch({ type: "RECEIVE_LOGIN", payload: data });
        getMe(json.data.token)(dispatch);
      })
      .catch(e => {
        displayError(e);
      });
  };
};

interface GetMeAction {
  readonly type: "GET_ME";
}

interface ReceiveGetMeAction {
  readonly type: "RECEIVE_GET_ME";
  readonly payload: UserInfo;
}

export const getMe = (token: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: "GET_ME" });
    axiosInstance
      .get(meUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(r => r.data)
      .then(json => {
        var data: UserInfo = json.data;
        dispatch({ type: "RECEIVE_GET_ME", payload: data });
      })
      .catch(e => {
        displayError(e);
      });
  };
};

interface LogoutAction {
  readonly type: "LOGOUT";
}

interface ReceiveLogoutAction {
  readonly type: "RECEIVE_LOGOUT";
}

export const logout = () => {
  return (dispatch: Dispatch<UserAction>, getState: Function) => {
    const state = getState();
    if (state.user) {
      const token = state.user.token;
      const expirationDate = state.user.tokenExpirationDate;
      performIfTokenValid(expirationDate, dispatch, () => {
        dispatch({ type: "LOGOUT" });
        axiosInstance
          .get(logoutUrl, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(r => r.data)
          .then(() => {
            dispatch({ type: "RECEIVE_LOGOUT" });
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

interface GetUserAction {
  readonly type: "GET_USER";
}

interface ReceiveGetUserAction {
  readonly type: "RECEIVE_GET_USER";
  readonly payload: UserName;
}

export const getUser = (userId: string) => {
  return (dispatch: Dispatch<UserAction>, getState: Function) => {
    const state = getState();
    if (state.user) {
      const token = state.user.token;
      const expirationDate = state.user.tokenExpirationDate;
      performIfTokenValid(expirationDate, dispatch, () => {
        dispatch({ type: "GET_USER" });
        axiosInstance
          .get(`${userUrl}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(r => r.data)
          .then(json => {
            const name: UserName = json.data;
            dispatch({ type: "RECEIVE_GET_USER", payload: name });
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

export interface ExpireToken {
  type: "EXPIRE_TOKEN";
}

export type UserAction =
  | ReceiveLoginAction
  | LoginAction
  | ReceiveLoginAction
  | GetMeAction
  | ReceiveGetMeAction
  | LogoutAction
  | ReceiveLogoutAction
  | GetUserAction
  | ReceiveGetUserAction
  | ExpireToken;
