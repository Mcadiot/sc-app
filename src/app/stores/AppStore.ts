import { UserStore } from "./user/userStore";

export default interface AppStore {
  readonly user: UserStore;
}
