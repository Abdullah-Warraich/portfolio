import React from 'react';
import './Modal.css'; // Make sure to create this CSS file

const Modal = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Enlarged" className="modal-image" />
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Modal;
