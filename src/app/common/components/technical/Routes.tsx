import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../../../routes/routes";

export const Routes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route path={route.path} key={i}>
          <route.component {...route} />
        </Route>
      ))}
    </Switch>
  );
};
