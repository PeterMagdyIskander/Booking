import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";
const UserNavbar = (props) => {
  const {dispatch}=props;
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Successufully Signed out");
        dispatch(setAuthedUser(null));
      })
      .catch(function () {
        console.log("Error Signed out");
      });
    
  };
    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/properties">Browser Properties</NavLink>
            </li>
            <li>
            <NavLink to="/" onClick={signOut}>Sign out</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  

  
};
export default connect()(UserNavbar);
