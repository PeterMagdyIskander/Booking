import { useState,useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import db from "../utils/firebaseDB";
const EditDeleteCard = (props) => {
  const {id}=props;
  const [property,setProperty]=useState({});
  console.log('id',id)
  useEffect(() => {
     db.collection("Properties")
        .doc(id)
        .get()
        .then((snapshot) => {
          let data = snapshot.data();
          setProperty(data);
        });
  },[id]);

  console.log('this property',property)
  return (
    <Link to={`/EditDeleteProperty/${id}`}>
      <div>
        <h1>{property.name}</h1>
        <button>Edit Property</button>
      </div>
    </Link>
  );
};

export default withRouter(connect()(EditDeleteCard));
