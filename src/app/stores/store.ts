import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user/userReducer";

export const store = createStore(combineReducers({ user: userReducer }), applyMiddleware(thunk));
