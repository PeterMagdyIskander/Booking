import { useEffect, useState } from "react";
import { getPendingRequestsForOwner } from "../utils/api";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import NotificationCard from "./notificationCard";

const Notification = (props) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { dispatch, authedUser } = props;
  useEffect(
    (props) => {
      dispatch(showLoading());
      getPendingRequestsForOwner(authedUser.id).then((res) => {
        setPendingRequests(res);
        console.log('pending requests', pendingRequests);
        dispatch(hideLoading());
      });
    },
    [dispatch,authedUser,pendingRequests]
  );

  return (
    <div>
      <h1> Your Notification </h1>
      {pendingRequests.map((req) => {
        return <NotificationCard request={req} key={req.userName} />;
      })}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(Notification)
