import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Load component
import NavBar from "./components/layout/Navbar";
import CreateBook from "./components/layout/CreateBook";
import CreateUser from "./components/layout/CreateUser";
import AllUser from "./components/layout/AllUser";
import AllBook from "./components/layout/AllBook";
import Transaction from "./components/layout/Transaction";
import Deshboard from "./components/layout/Deshboard";
import Drawer from "./components/layout/Drawers";

class MyRoute extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={NavBar} />

          <Route exact path="/dashboard" component={Deshboard} />
          <Route exact path="/drawer" component={Drawer} />
          <Route exact path="/createBook" component={CreateBook} />
          <Route exact path="/createUser" component={CreateUser} />
          <Route path="/allUser" component={AllUser} />
          <Route exact path="/allBook" component={AllBook} />
          <Route exact path="/transaction" component={Transaction} />
        </Router>
      </div>
    );
  }
}

export default MyRoute;
