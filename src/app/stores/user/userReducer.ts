import { UserAction } from "./userAction";
import { UserStore } from "./userStore";

export const userReducer = (userStore: UserStore, action: UserAction): UserStore => {
  switch (action.type) {
    case "RECEIVE_LOGIN":
      return { ...userStore, isLoggedIn: true, token: action.payload.token };
    case "RECEIVE_GET_ME":
      return { ...userStore, userInfo: action.payload };
    case "RECEIVE_LOGOUT":
      return { ...userStore, isLoggedIn: false, token: "", userInfo: undefined };
    default:
      if (userStore === undefined) {
        return {
          isLoggedIn: false,
          token: ""
        };
      } else {
        return userStore;
      }
  }
};
