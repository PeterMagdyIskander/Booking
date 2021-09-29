

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import OwnerNavbar from "./ownerNavbar";
import UserNavbar from "./userNavbar";

const Navbar=(props)=>{
    return(
        <div>
        {
          props.authedUser==null ? <div><p> [OUR LOGO] Happy Booking </p> <NavLink to="/" activeClassName="active">
                  signIn
                </NavLink></div> : props.authedUser.isOwner ? <OwnerNavbar /> : <UserNavbar />
        }
        </div>
    )
}

function mapStateToProps({authedUser}){
    return{
      authedUser,
    }
  }
  export default connect(mapStateToProps)(Navbar);
  