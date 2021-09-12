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
import Notification from './notificationPage'
import EditDeleteProperty from "./editDeleteProperty";
import OwnerNavbar from "./ownerNavbar";
import UserNavbar from "./userNavbar";
import EditDeletePage from "./editDeletePage";
import AddProperty from "./addPropertyPage";
import PrivateRoute from "./PrivateRoute";
function App(props) {
  
  useEffect(() => {
    props.dispatch(handleInitialData());
  });



  return (
    <Router>
    <LoadingBar />
      <Fragment>
        <div>
        {
          props.authedUser==null ? <p> welcome to our website </p> : props.authedUser.owner ? <OwnerNavbar /> : <UserNavbar />
        }
          <Route path="/" exact component={GetInMenu} />
          <Route path="/signIn" component={SignInPage} />
          <Route  path="/properties" component={properties} />
          <Route  path="/properties/:id" component={Property} />
          <Route  path="/signUp" component={SignUpPage} />
          <PrivateRoute isAuthenticated={props.authedUser} path="/notification" component={Notification} />
          <PrivateRoute isAuthenticated={props.authedUser} path="/EditDelete" component={EditDeletePage} />
          <PrivateRoute isAuthenticated={props.authedUser} path="/AddProperty" component={AddProperty} />
          <PrivateRoute isAuthenticated={props.authedUser} path="/EditDeleteProperty/:id" component={EditDeleteProperty} />
        </div>
      </Fragment>
    </Router>
  );
}

function mapStateToProps({authedUser}){
  return{
    authedUser,
  }
}
export default connect(mapStateToProps)(App);
