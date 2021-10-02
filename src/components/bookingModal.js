import { useState } from "react";

import Modal from "react-modal";
import { connect } from "react-redux";
import db from "../utils/firebaseDB";
const BookingModal = (props) => {
  const {authedUser,prop}=props;
  Modal.setAppElement("#root");
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [numberOfCampers,setNumberOfCampers]=useState(0);
  const [ageRange,setAgeRange]=useState(0);
  const [BookedSections,setBookedSections]=useState([]);
  const [BookedHalls,setBookedHalls]=useState([]);
  const [disableSection,setDisableSection]=useState(false);
  const [disableHall,setDisableHall]=useState(false);
  const [place, setPlace] = useState('please select a section');
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [hall, setHall] = useState('please select a hall');
  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
    setDisableSection(true);
  };
  const handleHallChange = (e) => {
    setHall(e.target.value);
    setDisableHall(true);
  };
  function onChangeStartDate(e) {
    setStartDate(e.target.value);
  }
  function onChangeEndDate(e) {
    setEndDate(e.target.value);
  }
  function handleChangeNumberOfCampers(e){
    setNumberOfCampers(e.target.value);
  }
  function handleChangeAgeRange(e){
    setAgeRange(e.target.value);
  }
  const handleNumberOfRoomsChange=(e)=>{
    setNumberOfRooms(e.target.value);
  }
  const handleAddSectionToReservation=()=>{
    setBookedSections(arr=>[...BookedSections,{
      numberOfRoomsBooked:numberOfRooms,
      sectionName:place,
    }])
  }
  const handleAddHall=()=>{
    setBookedHalls(arr=>[...BookedHalls,hall]);
  }
  function generateID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  let reservationBlueprint={
    accepted: false,
    userName:authedUser.firstName,
    phoneNumber:authedUser.phoneNumber,
    numberOfCampers: numberOfCampers,
    ageRange: ageRange,
    BookedSections: BookedSections,
    hallsBooked: BookedHalls,
  }
  const handleBooking = () => {
    let newReservationId=generateID();
    db.collection('Reservations').doc(newReservationId).set({
      accepted: false,
      userName:authedUser.firstName,
      phoneNumber:authedUser.phoneNumber,
      numberOfCampers: numberOfCampers,
      ageRange: ageRange,
      BookedSections: BookedSections,
      hallsBooked: BookedHalls,
      reservationId:newReservationId,
      propertyId:prop.id,
    });
    let Reservations=[...prop.reservations,newReservationId]
    db.collection('Properties').doc(prop.id).update({reservations:Reservations});
  
    };
  
  console.log(prop.id,reservationBlueprint)
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
    >
      <h2>Book {props.prop.name}</h2>
      <p>number of campers </p>
      <input placeholder='please enter the number of campers' onChange={handleChangeNumberOfCampers}/>
      
      <p>age Range </p>
      <input placeholder='please enter the age range of campers' onChange={handleChangeAgeRange}/>
      
     <div>
     <select value={place} onChange={handlePlaceChange}>
        <option value='please select a section to book' disabled={disableSection}>
        please select a section to add rooms to
        </option>
        {prop.sections.map((section) => {
          return (
            <option key={section.sectionName} value={section.sectionName}>
              {section.sectionName}{" "}
            </option>
          );
        })}
      </select>
      <p>number of rooms u need in this section</p>
      <input placeholder='please enter the number of rooms that u need' onChange={handleNumberOfRoomsChange}/>
      <br/>
     <button onClick={handleAddSectionToReservation}>confirm</button>
     </div>
      <div>
      <select value={hall} onChange={handleHallChange}>
      <option value='please select a hall' disabled={disableHall}>
        Please select a hall
        </option>
          {prop.halls.map((hall) => {
            return (
              <option key={hall.hallName} value={hall.hallName}>
                {hall.hallName}{" "}
              </option>
            );
          })}
        </select>
        <br/>
        <button onClick={handleAddHall}>Confirm</button>
      </div>
      <form>
        <p>from </p>
        <input
          type="date"
          min={today}
          value={startDate}
          onChange={onChangeStartDate}
        />
        <p>to </p>
        <input
          type="date"
          min={today}
          value={endDate}
          onChange={onChangeEndDate}
        />
      </form>
      <button onClick={handleBooking}>Book Now</button>
      <br />
      <button onClick={props.closeModal}>close</button>
    </Modal>
  );
};
function mapStateToProps({authedUser}){
  return{
    authedUser,
  }
}
export default connect(mapStateToProps)(BookingModal);
