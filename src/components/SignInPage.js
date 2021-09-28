import React, { useState } from "react";
import { signIn } from "../utils/api";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router";
import { showLoading, hideLoading} from "react-redux-loading-bar";

const SignInPage = (props) => {
  const { dispatch } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [owner, setOwner] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    dispatch(showLoading());
    const user = await signIn(username, password);
    if (user !== null) {
      dispatch(setAuthedUser(user));
      setOwner(user.owner);
      setSignedIn(true);
    } else {
      alert("Username or Password is incorrect");

      setLoading(false);
    }
    dispatch(hideLoading());
  }
  function handleOnChangeUsername(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }
  function handleOnChangePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  if (signedIn && owner) {
    return <Redirect to="/notification" />;
  } else if (signedIn && !owner) {
    return <Redirect to="/properties" />;
  }

  return (
    <div>
      <form>
        <input
          placeholder="Enter your username please"
          onChange={handleOnChangeUsername}
        />
        <input
          placeholder="Enter your password please"
          type="password"
          onChange={handleOnChangePassword}
        />
        <button disabled={loading} onClick={handleSubmit}>
          SignIn
        </button>
      </form>
    </div>
  );
};

export default connect()(SignInPage);
