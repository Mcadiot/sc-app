import { UserInfo } from "../../common/class/UserInfo";

export interface UserStore {
  isLoggedIn: boolean;
  token: string;
  userInfo?: UserInfo;
}
