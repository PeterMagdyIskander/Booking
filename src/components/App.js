import React, { Fragment,useState ,useEffect } from "react";
import { connect } from "react-redux";
import  LoadingBar  from "react-redux-loading-bar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import properties from "./properties";
import Property from "./property";
import GetInMenu from "./gettingInMenu";
import Notification from './notificationPage'
import EditDeleteProperty from "./editDeleteProperty";
import EditDeletePage from "./editDeletePage";
import AddProperty from "./addPropertyPage";
import PrivateRoute from "./PrivateRoute";
import db from "../utils/firebaseDB";
import Signup from "./signUp";
import Navbar from "./navBar";
import { receiveProperties } from "../actions/properties";

function App(props) {
  const [info , setInfo] = useState([]);

  useEffect(() => {
    props.dispatch(receiveProperties(info));
  });


  const Fetchdata = ()=>{
    db.collection("Properties").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        let data = element.data(); //initialize variable called data
        setInfo(arr => [...arr , data]);
    });
    })
}


window.addEventListener('load', () => {
  Fetchdata();
});

console.log('firebase data',info)
  return (
    <Router>
    <LoadingBar />
      <Fragment>
      <Navbar />
        <div>
          
          <Route path="/" exact component={GetInMenu} />
          <Route  path="/properties" component={properties} />
          <Route  path="/property/:id" component={Property} />
          <Route  path="/signUp" component={Signup} />
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
