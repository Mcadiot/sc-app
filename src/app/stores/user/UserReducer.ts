import { UsersNames } from "../../common/class/UsersNames";
import { UserAction } from "./UserAction";
import { UserStore } from "./UserStore";

export const userReducer = (userStore: UserStore, action: UserAction): UserStore => {
  switch (action.type) {
    case "RECEIVE_LOGIN":
      return { ...userStore, isLoggedIn: true, token: action.payload.token, tokenExpirationDate: action.payload.expirationDate };
    case "RECEIVE_GET_ME":
      return { ...userStore, userInfo: action.payload };
    case "RECEIVE_LOGOUT":
      return { ...userStore, isLoggedIn: false, token: "", userInfo: undefined, tokenExpirationDate: "" };
    case "RECEIVE_GET_USER":
      userStore.users.addUser(action.payload);
      return { ...userStore, users: userStore.users.clone() };
    case "EXPIRE_TOKEN":
      return { ...userStore, isLoggedIn: false, token: "", userInfo: undefined, tokenExpirationDate: "" };
    default:
      if (userStore === undefined) {
        return {
          isLoggedIn: false,
          token: "",
          tokenExpirationDate: "",
          users: new UsersNames()
        };
      } else {
        return userStore;
      }
  }
};
