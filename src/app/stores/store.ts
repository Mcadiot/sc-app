import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { bookingReducer } from "./booking/bookingReducer";
import { resourceReducer } from "./resource/resourceReducer";
import { userReducer } from "./user/userReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isLoggedIn", "token", "userInfo"]
};

export const store = createStore(
  combineReducers({
    user: persistReducer(persistConfig, userReducer as any),
    resource: resourceReducer,
    booking: bookingReducer
  }),
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
