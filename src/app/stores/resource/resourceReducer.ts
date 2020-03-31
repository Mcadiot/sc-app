import { ResourceAction } from "./resourceAction";
import { ResourceStore } from "./resourceStore";

export const resourceReducer = (resourceStore: ResourceStore, action: ResourceAction): ResourceStore => {
  switch (action.type) {
    case "RECEIVE_GET_RESOURCE":
      return { ...resourceStore, resource: action.payload };
    case "RECEIVE_GET_BOOKINGS":
      return { ...resourceStore, bookings: action.payload };
    default:
      if (resourceStore === undefined) {
        return {};
      } else {
        return resourceStore;
      }
  }
};
