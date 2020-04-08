import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { bookingReducer } from "./booking/BookingReducer";
import { resourceReducer } from "./resource/ResourceReducer";
import { userReducer } from "./user/UserReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isLoggedIn", "token", "userInfo", "tokenExpirationDate"]
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
