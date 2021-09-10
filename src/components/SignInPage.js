import React, { useEffect, useState } from "react";
import { getInitialData } from "../utils/api";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router";
import { showLoading,hideLoading, LoadingBar } from "react-redux-loading-bar"

const SignInPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usersKeys, setUsersKeys] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [toProperties, settoProperties] = useState(false);
  const {dispatch} =props;
  useEffect((props) => {
    dispatch(showLoading());
    getInitialData().then((res) => {
      setUsersKeys(Object.keys(res.users));
      setUsers(res.users);
      setDoneLoading(true);
      dispatch(hideLoading());
    });
  }, [dispatch]);
  function handleOnSubmit(e) {
    e.preventDefault();
    if (usersKeys.includes(username)) {
      if (password === users[username].password) {
        props.dispatch(setAuthedUser(username));
        settoProperties(true);
      } else {
        alert("invalid password");
      }
    } else {
      alert("user not found");
    }
  }
  function handleOnChangeUsername(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }
  function handleOnChangePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  if (toProperties === true&&!users[username].owner) {
    return <Redirect to="/properties" />;
  }else if(toProperties === true&&users[username].owner){
    return <Redirect to="/notification" />;
  }
  return (
    <div>
    <LoadingBar />
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder="Enter your username please"
          onChange={handleOnChangeUsername}
        />
        <input
          placeholder="Enter your password please"
          type="password"
          onChange={handleOnChangePassword}
        />
        <button disabled={!doneLoading} onSubmit={handleOnSubmit}>SignIn</button>
      </form>
    </div>
  );
};



export default connect()(SignInPage);
