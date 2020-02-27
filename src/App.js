import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Landing  from "./components/Landing/Landing";
import Chat from "./components/Chat/Chat";
import {PrivateRoute} from "./resources/PrivateRoute";


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    );
  }
}
export default App;