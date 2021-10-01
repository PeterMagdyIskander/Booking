import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import FillOutPage from "./fillOutPage";
import db from "../utils/firebaseDB";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      const userInfo = authResult.additionalUserInfo;
      if (userInfo.isNewUser && userInfo.providerId === "password") {
        try {
          await authResult.user.sendEmailVerification();
          console.log("Check your email.");
        } catch (e) {
          console.log(e);
        }
      }
      return false;
    },
  },
};




const Signup = (props) => {
  
  const { dispatch } = props;

  const [user, setUser] = useState(null);
  const [found,setFound]=useState(null);

  useEffect(()=>  {
    const checkIfExists = (user) => {
      if(user){
        db.collection("Users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          setFound(snapshot.data());
          if(snapshot.exists){
            dispatch(setAuthedUser(snapshot.data()));
          }else{
            dispatch(setAuthedUser(null));
          }
          
        });
      }
    };
    


    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
    checkIfExists(user)
    return authObserver
  },[dispatch,user]);



  if (user) {
    if(found) {
      return <Redirect to="/properties" />;
      
    } else {
      return (
        <>
          <FillOutPage firstName={user.displayName} uid={user.uid} />
        </>
      );
    }
  } else {
    return (
      <>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </>
    );
  }
};

export default connect()(Signup);
