import { UsersNames } from "../../common/class/UsersNames";
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
    case "RECEIVE_GET_USER":
      userStore.users.addUser(action.payload);
      return { ...userStore, users: userStore.users.clone() };
    default:
      if (userStore === undefined) {
        return {
          isLoggedIn: false,
          token: "",
          users: new UsersNames()
        };
      } else {
        return userStore;
      }
  }
};
