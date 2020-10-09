import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Load component

// import Login from "./components/layout/Login";
import NavBar from "./components/layout/Navbar";
import CreateBook from "./components/layout/CreateBook";
import CreateUser from "./components/layout/CreateUser";
import AllUser from "./components/layout/AllUser";
import AllBook from "./components/layout/AllBook";
import Transaction from "./components/layout/Transaction";
import Deshboard from "./components/layout/Deshboard";

class MyRoute extends Component {
  render() {
    return (
      <div>
        <Router>
          {/* <Route path="/" component={Login} /> */}
          <Route path="/" component={NavBar} />

          <Route exact path="/dashboard" component={Deshboard} />
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
