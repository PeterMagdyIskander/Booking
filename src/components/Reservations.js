import { useState,useEffect } from "react"
import { connect } from "react-redux";
import db from "../utils/firebaseDB";

const Reservations =(props)=>{
  const [acceptedReservations, setAcceptedReservations] = useState([]);
  const { authedUser } = props;

  const getAllReservationInAProperty = (ids) => {
    ids.map((id) => {
      return db.collection("Reservations")
      .doc(id)
      .get()
      .then((snapshot) => {
        let data = snapshot.data();
        if(data.accepted){
            setAcceptedReservations((arr) => [...arr, data]);
        }
        
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
  console.log('accepted',acceptedReservations)
return (
    <div>
       {JSON.stringify(acceptedReservations)}
    </div>
)
}
function mapStateToProps({ authedUser }) {
    return {
      authedUser: authedUser,
    };
  }
  export default connect(mapStateToProps)(Reservations);