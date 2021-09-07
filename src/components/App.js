import React, { Fragment, useEffect } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import  LoadingBar  from "react-redux-loading-bar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import properties from "./properties";
import Property from "./property";
import GetInMenu from "./gettingInMenu";
function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });
  return (
    <Router>
    <LoadingBar />
      <Fragment>
        
        <div>
          <Route path="/" exact component={GetInMenu} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/properties" component={properties} />
          <Route path="/p/:id" component={Property} />
          <Route path="/signUp" component={SignUpPage} />
        </div>
      </Fragment>
    </Router>
  );
}

export default connect()(App);