import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { resourceReducer } from "./resource/resourceReducer";
import { userReducer } from "./user/userReducer";

export const store = createStore(combineReducers({ user: userReducer, resource: resourceReducer }), applyMiddleware(thunk));
