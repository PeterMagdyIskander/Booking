import { useState } from "react";
import NotificationModal from "./notificationModal";

const NotificationCard = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <p>{props.request.userName}</p>
      <button onClick={openModal}>View more info</button>
      <NotificationModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        request={props.request}
      />
    </div>
  );
};
export default NotificationCard;
