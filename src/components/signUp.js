import React,{useState,useEffect} from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

var uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
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
}

const Signup =()=>{
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = firebase.auth().currentUser;
        const authObserver = firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
        });
        return authObserver;
      });
    
      if (user) {
        return (
          <>
            <p>
              Welcome, {user.displayName} <br />
              <small>{user.email}</small> <br />
            </p>
          </>
        );
      } else {
        return (
          <>
            <div>Sign up / Register</div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </>
        );
      }
    
}

export default Signup;