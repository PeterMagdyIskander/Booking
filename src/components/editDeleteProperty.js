import { useState,useEffect } from "react";
import { connect } from "react-redux";
import Rooms from "./rooms";
import Modal from "react-modal";
import db from "../utils/firebaseDB";
import { NavLink } from "react-router-dom";
const EditDeleteProperty = (props) => {
  Modal.setAppElement("#root");
  const {id}=props;
  let propertyBluePrint={
    location:'',
    halls:[{hallCapacity:0,hallName:''},],
    id:'',
    name:'',
    reservations:['',],
    website:'',
    sections:[{sectionName:'',sectionRooms:[{capacity:0,numberOfRooms:0,roomName:''}]}]
  }
  const [property,setProperty]=useState(propertyBluePrint);
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

  
  const [nameModalIsOpen, setNameIsOpen] = useState(false);
  const [locationModalIsOpen, setLocationIsOpen] = useState(false);
  const [websiteModalIsOpen, setWebsiteIsOpen] = useState(false);
  const [sectionAddRoomsModalIsOpen, setSectionAddRoomsIsOpen] =
    useState(false);
  const [disableSection,setDisableSection]=useState(false);
  const [disableSectionModal,setDisableSectionModal]=useState(false);
  const [disableHall,setDisableHall]=useState(false);
  const [disableHallModal,setDisableHallModal]=useState(false);
  const [addSectionModalIsOpen, addSectionIsOpen] = useState(false);
  const [removeSectionModalIsOpen, removeSectionIsOpen] = useState(false);
  const [hallModalIsOpen, setHallIsOpen] = useState(false);
  const [removeHallModalIsOpen, setremoveHallIsOpen] = useState(false);

  const [place, setPlace] = useState('please select a section');
  const [placeModal, setPlaceModal] = useState('please select a section to remove');
  
  const [hall, setHall] = useState('please select a hall');
  const [hallModal, setHallModal] = useState('please select a hall to remove');

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
    setDisableSection(true);
  };
  const handlePlaceModalChange = (e) => {
    setPlaceModal(e.target.value);
    setDisableSectionModal(true);
  };
  const handleHallChange = (e) => {
    setHall(e.target.value);
    setDisableHall(true);
  };
  const handleHallModalChange = (e) => {
    setHallModal(e.target.value);
    setDisableHallModal(true);
  };
  const handleDelete=()=>{
    db.collection('Properties').doc(id).delete();
  }
  const handleApplyChanges=()=>{
    db.collection('Properties').doc(id).delete();
    db.collection('Properties').doc(id).set(property);
  }
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

  console.log('this is the property',property)
  return (
    <div>
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

      </div>    
      <div>
      <p>{property.location}</p>

        <button onClick={() => openModal("location")}>
          edit property location
        </button>
        <Modal
          isOpen={locationModalIsOpen}
          onRequestClose={() => closeModal("location")}
        >
          <input
            onChange={(e) => {
              prop.location = e.target.value;
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
      </div>
      <div>
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
      </div>
      <div>
        <p>Add a sections</p>
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
      </div>
      <div>
        <select value={place} onChange={handlePlaceChange}>
        <option value='please select a section to add rooms to' disabled={disableSection}>
        please select a section to add rooms to
        </option>
        {property.sections.map((section) => {
          return (
            <option key={section.sectionName} value={section.sectionName}>
              {section.sectionName}{" "}
            </option>
          );
        })}
      </select>
      </div>
      <div>
      <button onClick={() => openModal("sectionAddRooms")}> Add Rooms to {place} </button>
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
              prop.sections[getIndex(place, property, true)].sectionRooms.push(
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
      </div>
      <div>
      <button
          disabled={property.sections.length <= 1}
          onClick={() => openModal("removeSection")}
        >
          {" "}
          Remove Section{" "}
        </button>
        <Modal
          isOpen={removeSectionModalIsOpen}
          onRequestClose={() => closeModal("removeSection")}
        >
          <select value={placeModal} onChange={handlePlaceModalChange}>
          <option value='please select a section to remove' disabled={disableSectionModal}>
        please select a section to remove
        </option>
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
              let index = getIndex(placeModal, prop, true);
              prop.sections.splice(index, 1);
              setProperty(prop);
              if (index === 0) {
                setPlace(property.sections[0].sectionName);
                setPlaceModal(property.sections[0].sectionName);
              }
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
      </div>
      <div>
      {place!=='please select a section'&&(<Rooms
          sectionRooms={
            property.sections[getIndex(place, property, true)].sectionRooms
          }
        />)
        }
      </div>
      <div>
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
      </div>
      <div>
      <select value={hall} onChange={handleHallChange}>
      <option value='please select a hall' disabled={disableHall}>
        Please select a hall
        </option>
          {property.halls.map((hall) => {
            return (
              <option key={hall.hallName} value={hall.hallName}>
                {hall.hallName}{" "}
              </option>
            );
          })}
        </select>
      </div>
      <div>
      <button
          disabled={property.halls.length <= 1}
          onClick={() => openModal("removeHall")}
        >
          {" "}
          Remove Hall{" "}
        </button>
        <Modal
          isOpen={removeHallModalIsOpen}
          onRequestClose={() => closeModal("removeHall")}
        >
          <select value={hallModal} onChange={handleHallModalChange}>
          <option value='please select a hall to remove' disabled={disableHallModal}>
          please select a hall to remove
        </option>
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
              let index = getIndex(hallModal, prop, false);
              prop.halls.splice(index, 1);
  
              setProperty(prop);
              if (index === 0) {
                setHall(property.halls[0].hallName);
                setHallModal(property.halls[0].hallName);
              }
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

      </div>
      <div>
        {hall!=='please select a hall'&&(<p>
          capacity {property.halls[getIndex(hall, property, false)].hallCapacity}
        </p>)}
      </div>
      <div>
      <NavLink to="/properties" onClick={handleApplyChanges}>Apply Changes</NavLink> 
    </div>
      <div>
    <NavLink to="/properties" onClick={handleDelete}>Delete property</NavLink>
    </div>
    </div>
  );
};
function mapStateToProps({ properties, authedUser },props) {
  const { id } = props.match.params;
  return {
    id,
  };
}

export default connect(mapStateToProps)(EditDeleteProperty);
