import { BookingStore } from "./booking/BookingStore";
import { ResourceStore } from "./resource/ResourceStore";
import { UserStore } from "./user/UserStore";

export default interface AppStore {
  readonly user: UserStore;
  readonly resource: ResourceStore;
  readonly booking: BookingStore;
}
