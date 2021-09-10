import { useState } from "react";
import { connect } from "react-redux";
import Rooms from "./rooms";
import BookingModal from "./bookingModal";
const Property = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  let authed = props.authedUser == null ? true : false;
  const [place, setPlace] = useState(props.prop.sections[0].sectionName);
  const [hall, setHall] = useState(props.prop.halls[0].hallName);

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };
  const handleHallChange = (e) => {
    setHall(e.target.value);
  };
  function getIndex(placeName, prop, bool) {
    if (bool) {
      for (let i = 0; i < prop.sections.length; i++) {
        if (placeName === prop.sections[i].sectionName) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < prop.halls.length; i++) {
        if (placeName === prop.halls[i].hallName) {
          return i;
        }
      }
    }
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <h1>property info</h1>
      <h1>{props.prop.name}</h1>

      <select value={place} onChange={handlePlaceChange}>
        {props.prop.sections.map((section) => {
          return (
            <option key={section.sectionName} value={section.sectionName}>
              {section.sectionName}{" "}
            </option>
          );
        })}
      </select>
      <Rooms
        sectionRooms={
          props.prop.sections[getIndex(place, props.prop, true)].sectionsRooms
        }
      />

      <select value={hall} onChange={handleHallChange}>
        {props.prop.halls.map((hall) => {
          return (
            <option key={hall.hallName} value={hall.hallName}>
              {hall.hallName}{" "}
            </option>
          );
        })}
      </select>
      <p>
        capacity{" "}
        {props.prop.halls[getIndex(hall, props.prop, false)].hallCapacity}
      </p>
      <h1>{props.Location}</h1>
      <h1>{props.website}</h1>
      <button disabled={authed} onClick={openModal}>
        book now
      </button>

      <BookingModal modalIsOpen={modalIsOpen} closeModal={closeModal} prop={props.prop} />
    </div>
  );
};

function mapStateToProps({ properties, authedUser }, props) {
  const { id } = props.match.params;
  const ids = Object.keys(properties);
  for (let i = 0; i < ids.length; i++) {
    if (properties[i].id === id) {
      var prop = properties[i];
      break;
    }
  }
  return {
    prop,
    id: id,
    authedUser,
  };
}

export default connect(mapStateToProps)(Property);
