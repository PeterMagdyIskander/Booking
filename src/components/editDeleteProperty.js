import { useState } from "react";
import { connect } from "react-redux";
import Rooms from "./rooms";
import Modal from "react-modal";
const EditDeleteProperty = (props) => {
  Modal.setAppElement("#root");
  const [property, setProperty] = useState(props.property);
  const [nameModalIsOpen, setNameIsOpen] = useState(false);
  const [locationModalIsOpen, setLocationIsOpen] = useState(false);
  const [websiteModalIsOpen, setWebsiteIsOpen] = useState(false);
  const [sectionModalIsOpen, setSectionIsOpen] = useState(false);
  const [hallModalIsOpen, setHallIsOpen] = useState(false);
  const [place, setPlace] = useState(property.sections[0].sectionName);
  const [hall, setHall] = useState(property.halls[0].hallName);

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
  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };
  const handleHallChange = (e) => {
    setHall(e.target.value);
  };
  function openModal(target) {
    switch (target) {
      case "name":
        setNameIsOpen(true);
        break;
      case "location":
        setLocationIsOpen(true);
        break;
      case "website":
        setWebsiteIsOpen(true);
        break;
      case "section":
        setSectionIsOpen(true);
        break;
      case "hall":
        setHallIsOpen(true);
        break;
    }
  }
  function closeModal(target) {
    switch (target) {
      case "name":
        setNameIsOpen(false);
        break;
      case "location":
        setLocationIsOpen(false);
        break;
      case "website":
        setWebsiteIsOpen(false);
        break;
      case "section":
        setSectionIsOpen(false);
        break;
      case "hall":
        setHallIsOpen(false);
    }
  }
  let prop = property;
  let newRooms = {
    roomName: " ",
   capacity:0,
   numberOfRooms:0
  };
  let newHall = {
    hallName: " ",
    hallCapacity: 0,
  };
  return (
    <div>
      <p>{property.name}</p>
      <button onClick={() => openModal("name")}> edit property name </button>
      <Modal isOpen={nameModalIsOpen} onRequestClose={() => closeModal("name")}>
        <input
          onChange={(e) => {
            prop.name = e.target.value;
          }}
        />
        <button
          onClick={() => {
            setProperty(prop);
            closeModal("name");
          }}
        >
          Done
        </button>
      </Modal>

      <p>{property.Location}</p>
      <button onClick={() => openModal("location")}>
        edit property location
      </button>
      <Modal
        isOpen={locationModalIsOpen}
        onRequestClose={() => closeModal("location")}
      >
        <input
          onChange={(e) => {
            prop.Location = e.target.value;
          }}
        />
        <button
          onClick={() => {
            setProperty(prop);
            closeModal("location");
          }}
        >
          Done
        </button>
      </Modal>

      <p>{property.website}</p>
      <button onClick={() => openModal("website")}>
        edit property website
      </button>
      <Modal
        isOpen={websiteModalIsOpen}
        onRequestClose={() => closeModal("website")}
      >
        <input
          onChange={(e) => {
            prop.website = e.target.value;
          }}
        />
        <button
          onClick={() => {
            setProperty(prop);
            closeModal("website");
          }}
        >
          Done
        </button>
      </Modal>

      <p> sections </p>
      <button onClick={() => openModal("section")}> Edit Section </button>
      <Modal
        isOpen={sectionModalIsOpen}
        onRequestClose={() => closeModal("section")}
      >
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
            prop.sections[getIndex(place, property, true)].sectionsRooms.push(
              newRooms
            );
            setProperty(prop);
            closeModal("section");
          }}
        >
          Done
        </button>
      </Modal>

      <button> Remove Section </button>
      <br />
      <select value={place} onChange={handlePlaceChange}>
        {property.sections.map((section) => {
          return (
            <option key={section.sectionName} value={section.sectionName}>
              {section.sectionName}{" "}
            </option>
          );
        })}
      </select>
      <Rooms
        sectionRooms={
          property.sections[getIndex(place, property, true)].sectionsRooms
        }
      />
      <p> halls </p>
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
      </Modal>
      <button> Remove hall </button>
      <br />
      <select value={hall} onChange={handleHallChange}>
        {property.halls.map((hall) => {
          return (
            <option key={hall.hallName} value={hall.hallName}>
              {hall.hallName}{" "}
            </option>
          );
        })}
      </select>
      <p>
        capacity {property.halls[getIndex(hall, property, false)].hallCapacity}
      </p>
    </div>
  );
};

function mapStateToProps({ properties, authedUser }) {
  const ids = Object.keys(properties);
  for (let i = 0; i < ids.length; i++) {
    if (properties[i].owner === authedUser) {
      var property = properties[i];
      break;
    }
  }
  return {
    property,
  };
}

export default connect(mapStateToProps)(EditDeleteProperty);
