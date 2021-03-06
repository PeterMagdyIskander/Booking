
import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import db from "../utils/firebaseDB";
import { Redirect } from "react-router";

const FillOutPage = (props) => {
  const { dispatch } = props;
  const [ownerBoolean, setOwnerBoolean] = useState(false);
  const [phoneNumber,setphoneNumber]=useState('0-10-xxxx-xxxx')
  const [redirect,setRedirect]=useState(false);
  let newUser={
    firstName:props.firstName,
    phoneNumber:phoneNumber,
    isOwner:ownerBoolean,
    id:props.uid,
    propertyIds:[]
  }
  const handleChange = () => {
    setOwnerBoolean(!ownerBoolean);
  };

  const handlePhoneNumberChange=(e)=>{
    setphoneNumber(e.target.value)
  }
  const submitForm=(e)=>{
    e.preventDefault();
    db.collection('Users').doc(props.uid).set(newUser);
    dispatch(showLoading());
    dispatch(setAuthedUser(newUser));
    dispatch(hideLoading());
    setRedirect(true);
  }
  if(redirect){
    return <Redirect to='properties' />
  }
  return (
    <div>
    <form >
    <p> {`Hello ${props.firstName}`} </p>

    <p> your Phone number is {phoneNumber} </p>
    <input placeholder='Enter  a phone number here'
      onChange={handlePhoneNumberChange}
    />
      <div>
        <input
          type="radio"
          value="Owner"
          name="ownerBoolean"
          onChange={handleChange}
        />
        <label htmlFor="Owner">Owner</label>

        <input
          type="radio"
          value="User"
          name="ownerBoolean"
          onChange={handleChange}
          defaultChecked 
        />
        <label htmlFor="User">User</label>
      </div>
    
    
    <button to='/properties' onClick={submitForm}> Start Browsing!</button>

    </form>
      <p>{JSON.stringify(newUser)}</p>
      <p>{props.uid}</p>
    </div>
  );
};

export default connect()(FillOutPage);
