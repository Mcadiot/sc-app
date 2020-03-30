import { UserAction } from "./userAction";
import { UserStore } from "./userStore";

export const userReducer = (userStore: UserStore, action: UserAction): UserStore => {
  switch (action.type) {
    case "LOGIN":
      return { ...userStore, isLoggedIn: true };
    default:
      if (userStore === undefined) {
        return {
          id: "",
          isLoggedIn: false
        };
      } else {
        return userStore;
      }
  }
};
