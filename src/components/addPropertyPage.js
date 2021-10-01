import { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import db from '../utils/firebaseDB'
const AddPropertyPage = (props) => {
  Modal.setAppElement("#root");
  const {authedUser}=props;
  const id=generatePropertyID();
  let propertyBlueprint = {
    owner: authedUser.id,
    id: id,
    name: "",
    sections: [],
    halls: [],
    Location: "",
    website: "",
  };
  const [property, setProperty] = useState(propertyBlueprint);
  const [propertyName, setPropertyName] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyWebsite, setPropertyWebsite] = useState("");
  const [sectionAddRoomsModalIsOpen, setSectionAddRoomsIsOpen] = useState(false);
  const [addSectionModalIsOpen, addSectionIsOpen] = useState(false);
  const [place, setPlace] = useState("please add a section");
  const [placeModal, setPlaceModal] = useState(place);
  const [hallModalIsOpen, setHallIsOpen] = useState(false);
  const handlePlaceModalChange = (e) => {
    setPlaceModal(e.target.value);
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
  function openModal(target) {
    switch (target) {
      case "sectionAddRooms":
        setSectionAddRoomsIsOpen(true);
        break;
      case "addSection":
        addSectionIsOpen(true);
        break;
        case "hall":
        setHallIsOpen(true);
        break;
      default:
        break;
    }
  }
  function closeModal(target) {
    switch (target) {
      case "sectionAddRooms":
        setSectionAddRoomsIsOpen(false);
        break;
      case "addSection":
        addSectionIsOpen(false);
        break;
        case "hall":
        setHallIsOpen(false);
        break;
      default:
        break;
    }
  }

  function generatePropertyID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  async function sendToApi(property){
    db.collection('Properties').doc(generatePropertyID()).set(property);
  }

  let prop = property;
  let newSection = {
    sectionName: "",
    sectionsRooms: [],
  };
  let newRooms = {
    roomName: " ",
    capacity: 0,
    numberOfRooms: 0,
  };
  let newHall = {
    hallName: " ",
    hallCapacity: 0,
  };
  return (
    <div>
      <h1>add property</h1>
      <p> property name : {propertyName}</p>
      <input
        placeholder="enter the property name you want"
        onChange={(e) => {
          setPropertyName(e.target.value);
          
        }}
      />

      <p> property location : {propertyLocation}</p>
      <input
        placeholder="enter the property name you want"
        onChange={(e) => {
          setPropertyLocation(e.target.value);
          
        }}
      />

      <p> property website : {propertyWebsite}</p>
      <input
        placeholder="enter the property name you want"
        onChange={(e) => {
          setPropertyWebsite(e.target.value);
          
        }}
      />
    <br/>
      <button onClick={() => openModal("addSection")}> add a section </button>
      <Modal
        isOpen={addSectionModalIsOpen}
        onRequestClose={() => closeModal("addSection")}
      >
        <input
          placeholder="section name"
          onChange={(e) => {
            newSection.sectionName = e.target.value;
            newSection.sectionsRooms = [];
          }}
        />
        <button
          onClick={() => {
            setPlace(newSection.sectionName);
            setPlaceModal(newSection.sectionName)
            prop.name=propertyName;
            prop.Location=propertyLocation;
            prop.website=propertyWebsite;
            prop.sections.push(newSection);
            setProperty(prop);
            console.log("prop after adding ection", property);
            closeModal("addSection");
          }}
        >
          done
        </button>
        <button
          onClick={() => {
            closeModal("addSection");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>
      <button
        disabled={place === "please add a section"}
        onClick={() => openModal("sectionAddRooms")}
      >
        {" "}
        Add Rooms to a section
      </button>
      <Modal
        isOpen={sectionAddRoomsModalIsOpen}
        onRequestClose={() => closeModal("sectionAddRooms")}
      >
        <select value={placeModal} onChange={handlePlaceModalChange}>
          {property.sections.map((section) => {
            return (
              <option key={section.sectionName} value={section.sectionName}>
                {section.sectionName}{" "}
              </option>
            );
          })}
        </select>

        <input
          placeholder="room name"
          onChange={(e) => {
            newRooms.roomName = e.target.value;
          }}
        />
        <br />
        <input
          placeholder="room capacity"
          onChange={(e) => {
            newRooms.capacity = e.target.value;
          }}
        />
        <br />
        <input
          placeholder="number of rooms"
          onChange={(e) => {
            newRooms.numberOfRooms = e.target.value;
          }}
        />

        <br />
        <button
          onClick={() => {
            prop.sections[
              getIndex(placeModal, prop, true)
            ].sectionsRooms.push(newRooms);
            setProperty(prop);
            closeModal("sectionAddRooms");
          }}
        >
          Done
        </button>
        <button
          onClick={() => {
            console.log("prop", propertyBlueprint);
            closeModal("sectionAddRooms");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>
          <br/>
      <button onClick={() => openModal("hall")}> Add hall </button>
      <Modal isOpen={hallModalIsOpen} onRequestClose={() => closeModal("hall")}>
        <input
          placeholder="hall name"
          onChange={(e) => {
            newHall.hallName = e.target.value;
          }}
        />
        <br />
        <input
          onChange={(e) => {
            newHall.hallCapacity = e.target.value;
          }}
        />
        <br />

        <button
          onClick={() => {
            prop.halls.push(newHall);
            setProperty(prop);
            closeModal("hall");
          }}
        >
          Done
        </button>
        <button
          onClick={() => {
            closeModal("hall");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>

      <br/>
    <button onClick={()=>{sendToApi(property)}}>Add Property</button>
    </div>
  );
};

function mapStateToProps({authedUser}){
  return{
    authedUser,
  }
}
export default connect(mapStateToProps)(AddPropertyPage);
