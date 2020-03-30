import App from "../screen/App";
import LoginPage from "../screen/LoginPage";
import { loginUrl, roomsUrl } from "./routesConstants";

export const routes = [
  {
    path: loginUrl,
    component: LoginPage,
    mustBeLoggedIn: false,
    name: "Login"
  },
  {
    path: roomsUrl,
    component: App,
    mustBeLoggedIn: true,
    name: "Salles"
  },
  {
    path: "",
    component: LoginPage,
    mustBeLoggedIn: false,
    name: "Accueil"
  }
];
