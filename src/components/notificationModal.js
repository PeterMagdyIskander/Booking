import Modal from "react-modal";
import db from "../utils/firebaseDB";
const NotificationModal = (props) => {
  Modal.setAppElement("#root");
  const handleApprove=()=>{
    db.collection('Reservations').doc(props.request.reservationId).update({
      accepted:true
    })
  }
  const handleReject=()=>{
    db.collection('Reservations').doc(props.request.reservationId).delete();
    db.collection('Properties').doc(props.request.propertyId).update({
      reservations:[]
    })
  }
  console.log('reservation id',props.request.reservationId)
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      contentLabel="Example Modal"
    >
      <h2>requested by {props.request.userName}</h2>
      <button onClick={handleApprove}> approve request</button>
      <button onClick={handleReject}> reject request</button>
      <br />
      <button onClick={props.closeModal}>close</button>
    </Modal>
  );
};

export default NotificationModal;
