import { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationCard from "./notificationCard";
import db from "../utils/firebaseDB";
const Notification = (props) => {
  const [allReservations, setAllReservations] = useState([]);
  const { authedUser } = props;

  const getAllReservationInAProperty = (ids) => {
    ids.map((id) => {
      return db.collection("Reservations")
      .doc(id)
      .get()
      .then((snapshot) => {
        let data = snapshot.data();
        setAllReservations((arr) => [...arr, data]);
      });
    });
  };
  useEffect(() => {
    authedUser.propertyIds.map((id) => {
      return db.collection("Properties")
        .doc(id)
        .get()
        .then((snapshot) => {
          let data = snapshot.data();
          getAllReservationInAProperty(data.reservations);
        });
    });
  }, [authedUser.propertyIds]);
  console.log(allReservations);
  return (
    <div>
      <h1> Your Notification </h1>
      {allReservations.map((req) => {
        return <NotificationCard request={req} key={req.username} />;
      })}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(Notification);
