import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Layout } from ".//Layout/Layout";

import { List } from "./List/List";
import { About } from "./About/About";

export default ({ home }) => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to={home}></Redirect>
          </Route>

          <Route exact path="/list" component={List} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    </Layout>
  );
};
