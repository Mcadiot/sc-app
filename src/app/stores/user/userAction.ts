import { Dispatch } from "react";
import { DataLogin } from "../../common/class/DataLogin";
import { UserInfo } from "../../common/class/UserInfo";
import { axiosInstance } from "../axios";
import { loginUrl, meUrl } from "../constants";

interface LoginAction {
  readonly type: "LOGIN";
}

interface ReceiveLoginAction {
  readonly type: "RECEIVE_LOGIN";
  readonly payload: DataLogin;
}

interface ErrorLoginAction {
  readonly type: "ERROR_LOGIN";
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
        dispatch({ type: "ERROR_LOGIN" });
      });
  };
};

interface GetMeAction {
  readonly type: "GET_ME";
}

interface ReceiveGetMeAction {
  readonly type: "RECEIVE_GET_ME";
  readonly payload: any;
}

export interface ErrorGetMeAction {
  readonly type: "ERROR_GET_ME";
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
        dispatch({ type: "ERROR_GET_ME" });
      });
  };
};

export type UserAction =
  | ReceiveLoginAction
  | LoginAction
  | ReceiveLoginAction
  | ErrorLoginAction
  | GetMeAction
  | ReceiveGetMeAction
  | ErrorGetMeAction;
