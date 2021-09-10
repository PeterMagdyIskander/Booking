import { useState } from 'react';

import Modal from 'react-modal';

const BookingModal =(props)=>{
    Modal.setAppElement('#root');
    var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
   if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
  
  today = yyyy+'-'+mm+'-'+dd;



    const[startDate,setStartDate]=useState(today)
  const[endDate,setEndDate]=useState(today)
  
  function onChangeStartDate(e){
    setStartDate(e.target.value)
  }
  function onChangeEndDate(e){
    setEndDate(e.target.value)
  }



    return(
        <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Example Modal"
      >
        <h2 >Book {props.prop.name}</h2>
        
        <form>
        <p>from </p>
        <input type="date" min={today} value ={startDate} onChange={onChangeStartDate}/>
        <p>to </p>
        <input type="date" min={today} value ={endDate} onChange={onChangeEndDate}/>
        </form>
        <button onClick={props.closeModal}>close</button> 
      </Modal>
    )
}

export default BookingModal;