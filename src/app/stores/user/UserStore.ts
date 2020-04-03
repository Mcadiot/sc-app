import { UserInfo } from "../../common/class/UserInfo";
import { UsersNames } from "../../common/class/UsersNames";

export interface UserStore {
  isLoggedIn: boolean;
  token: string;
  tokenExpirationDate: string;
  userInfo?: UserInfo;
  users: UsersNames;
}
