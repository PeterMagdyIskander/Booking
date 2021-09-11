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
  const [sectionAddRoomsModalIsOpen, setSectionAddRoomsIsOpen] =
    useState(false);
  const [addSectionModalIsOpen, addSectionIsOpen] = useState(false);
  const [removeSectionModalIsOpen, removeSectionIsOpen] = useState(false);
  const [hallModalIsOpen, setHallIsOpen] = useState(false);
  const [removeHallModalIsOpen, setremoveHallIsOpen] = useState(false);
  const [place, setPlace] = useState(property.sections[0].sectionName);
  const [placeModal, setPlaceModal] = useState(
    property.sections[0].sectionName
  );
  const [hall, setHall] = useState(property.halls[0].hallName);
  const [hallModal, setHallModal] = useState(property.halls[0].hallName);
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
  const handlePlaceModalChange = (e) => {
    setPlaceModal(e.target.value);
  };
  const handleHallChange = (e) => {
    setHall(e.target.value);
  };
  const handleHallModalChange = (e) => {
    setHallModal(e.target.value);
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
      case "sectionAddRooms":
        setSectionAddRoomsIsOpen(true);
        break;
      case "addSection":
        addSectionIsOpen(true);
        break;
      case "removeSection":
        removeSectionIsOpen(true);

        break;
      case "hall":
        setHallIsOpen(true);
        break;
      case "removeHall":
        setremoveHallIsOpen(true);
        break;
      default:
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
      case "sectionAddRooms":
        setSectionAddRoomsIsOpen(false);
        break;
      case "addSection":
        addSectionIsOpen(false);
        break;
      case "removeSection":
        removeSectionIsOpen(false);
        break;
      case "hall":
        setHallIsOpen(false);
        break;
      case "removeHall":
        setremoveHallIsOpen(false);
        break;
      default:
        break;
    }
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
        <button
          onClick={() => {
            closeModal("name");
          }}
        >
          {" "}
          close{" "}
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
        <button
          onClick={() => {
            closeModal("location");
          }}
        >
          {" "}
          close{" "}
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
        <button
          onClick={() => {
            closeModal("website");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>

      <p> sections </p>
      <button  onClick={() => openModal("addSection")}> add a section </button>
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
            prop.sections.push(newSection);
            setProperty(prop);
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
      <button onClick={() => openModal("sectionAddRooms")}>
        {" "}
        Add Rooms to {place}
      </button>
      <Modal
        isOpen={sectionAddRoomsModalIsOpen}
        onRequestClose={() => closeModal("sectionAddRooms")}
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
            closeModal("sectionAddRooms");
          }}
        >
          Done
        </button>
        <button
          onClick={() => {
            closeModal("sectionAddRooms");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>

      <button disabled={property.sections.length<=1} onClick={() => openModal("removeSection")}>
        {" "}
        Remove Section{" "}
      </button>
      <Modal
        isOpen={removeSectionModalIsOpen}
        onRequestClose={() => closeModal("removeSection")}
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

        <br />
        <button
          onClick={() => {
            prop.sections.splice(getIndex(placeModal, prop, true), 1);
            setProperty(prop);
            closeModal("removeSection");
          }}
        >
          Done
        </button>
        <button
          onClick={() => {
            closeModal("removeSection");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>

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
        <button
          onClick={() => {
            closeModal("hall");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>
      <button disabled={property.halls.length<=1} onClick={() => openModal("removeHall")}> Remove Hall </button>
      <Modal
        isOpen={removeHallModalIsOpen}
        onRequestClose={() => closeModal("removeHall")}
      >
        <select value={hallModal} onChange={handleHallModalChange}>
          {property.halls.map((hall) => {
            return (
              <option key={hall.hallName} value={hall.hallName}>
                {hall.hallName}{" "}
              </option>
            );
          })}
        </select>

        <br />
        <button
          onClick={() => {
            prop.halls.splice(getIndex(hallModal, prop, false), 1);
            setProperty(prop);
            closeModal("removeHall");
          }}
        >
          Done
        </button>
        <button
          onClick={() => {
            closeModal("removeHall");
          }}
        >
          {" "}
          close{" "}
        </button>
      </Modal>
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
      <button> Apply changes </button>
      <button> delete this property </button>
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
