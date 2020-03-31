import { ResourceStore } from "./resource/resourceStore";
import { UserStore } from "./user/userStore";

export default interface AppStore {
  readonly user: UserStore;
  readonly resource: ResourceStore;
}
