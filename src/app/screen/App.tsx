import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Banner } from "../common/components/technical/Banner";
import { Content } from "../common/components/technical/Content";
import { routes } from "../routes/routes";

function App() {
  return (
    <Content>
      <Banner />
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route path={route.path} key={i}>
              <route.component {...route} />
            </Route>
          ))}
        </Switch>
      </Router>
    </Content>
  );
}

export default App;
