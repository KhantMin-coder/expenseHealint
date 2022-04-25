import React from "react";
import './Modal.scss'

const Modal = ({ isOpen, setIsOpen, children }) => {
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div>
          <div className="modal">{children}</div>
          <div className="bg" onClick={(e) => closeModal(e)} />
        </div>
      )}
    </div>
  );
};

export default Modal;
