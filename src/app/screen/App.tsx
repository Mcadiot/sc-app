import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Banner } from "../common/components/technical/Banner";
import { Content } from "../common/components/technical/layout/Content";
import { routes } from "../routes/Routes";

function App() {
  return (
    <main>
      <Content>
        <Router>
          <Banner />
          <Switch>
            {routes.map((route, i) => (
              <Route path={route.path} key={i}>
                <route.component {...route} />
              </Route>
            ))}
          </Switch>
        </Router>
      </Content>
    </main>
  );
}

export default App;
