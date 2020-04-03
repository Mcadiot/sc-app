import { ResourceAction } from "./ResourceAction";
import { ResourceStore } from "./ResourceStore";

export const resourceReducer = (resourceStore: ResourceStore, action: ResourceAction): ResourceStore => {
  switch (action.type) {
    case "RECEIVE_GET_RESOURCE":
      return { ...resourceStore, resource: action.payload };
    default:
      if (resourceStore === undefined) {
        return {};
      } else {
        return resourceStore;
      }
  }
};
