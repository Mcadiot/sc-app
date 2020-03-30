import { Dispatch } from "react";
import { RouterAction } from "react-router-redux";
import { axiosInstance } from "../axios";
import { loginUrl, meUrl } from "../constants";

interface LoginAction {
  readonly type: "LOGIN";
}

interface ReceiveLoginAction {
  readonly type: "RECEIVE_LOGIN";
  readonly payload: any;
}

interface ErrorLoginAction {
  readonly type: "ERROR_LOGIN";
}

export const login = () => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: "LOGIN" });
    axiosInstance
      .get(loginUrl)
      .then(json => {
        dispatch({ type: "RECEIVE_LOGIN", payload: json });
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

export const geMe = () => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: "GET_ME" });
    axiosInstance
      .get(meUrl)
      .then(json => {
        dispatch({ type: "RECEIVE_GET_ME", payload: json });
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
  | ErrorGetMeAction
  | RouterAction;
