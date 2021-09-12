import { useEffect, useState } from "react";
import { getPendingRequestsForOwner } from "../utils/api";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import NotificationCard from "./notificationCard";
import { Redirect,withRouter } from "react-router";

const Notification = (props) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [click,setClick]=useState(false)
  const { dispatch, authedUser } = props;
  useEffect(
    (props) => {
      dispatch(showLoading());
      getPendingRequestsForOwner(authedUser.id).then((res) => {
        setPendingRequests(res);
        dispatch(hideLoading());
      });
    },
    [dispatch,authedUser]
  );
function goToEdit(){
  setClick(true);
    
}
if(click){
  return <Redirect to="/EditDelete" />;
}
  return (
    <div>
      <h1> Your Notification </h1>
      {pendingRequests.map((req) => {
        return <NotificationCard request={req} key={req.userName} />;
      })}

      <button onClick={goToEdit}> edit property or delete </button>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Notification))
