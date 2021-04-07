import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Layout, Error } from "./Shared/index";
import { List } from "./List/List";
import { About } from "./About/About";

export default ({ home }) => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to={home}/>
          </Route>
          <Route exact path="/list" component={List} />
          <Route exact path="/list/about/:id" component={About} />
          <Route exact path="/error" component={Error} />
          <Route component={Error} />
        </Switch>
      </Router>
    </Layout>
  );
};
