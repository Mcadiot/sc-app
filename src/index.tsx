import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Content } from "./app/common/components/technical/Content";
import { routes } from "./app/routes/routes";
import { store } from "./app/stores/store";
import { lightTheme } from "./ressources/themes/light";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Content>
          <Switch>
            {routes.map((route, i) => (
              <Route path={route.path}>
                <route.component {...route} />
              </Route>
            ))}
          </Switch>
        </Content>
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
