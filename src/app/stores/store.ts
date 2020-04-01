import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { bookingReducer } from "./booking/bookingReducer";
import { resourceReducer } from "./resource/resourceReducer";
import { userReducer } from "./user/userReducer";

export const store = createStore(combineReducers({ user: userReducer, resource: resourceReducer, booking: bookingReducer }), applyMiddleware(thunk));
