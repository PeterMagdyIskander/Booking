
import Modal from 'react-modal';

const NotificationModal =(props)=>{
    Modal.setAppElement('#root');
    return(
        <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Example Modal"
      >
        <h2>requested by {props.request.userName}</h2>
        <button> approve request</button>
        <button> reject request</button>
        <br/>
        <button onClick={props.closeModal}>close</button>
      </Modal>
    )
}

export default NotificationModal;