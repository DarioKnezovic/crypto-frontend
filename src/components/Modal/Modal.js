import React, { useEffect, useRef } from 'react';

import "./Modal.css";
import CloseIcon from "../../assets/icons/modal/close-icon.svg";

const Modal = ({ modalStyle, children, show, title, onClose, backdropStyle }) => {
    const modalRef = useRef(null);
    useEffect(
        () => {
            if (show) {
                modalRef.current.classList.add('visible');
            }
            else {
                modalRef.current.classList.remove('visible');
            }
        },
        [
            show
        ]
    );
    return (
        <React.Fragment>
            <div ref={modalRef} style={backdropStyle} className="modal__wrap">
                <div className="modal" style={modalStyle}>
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <img className="close-icon" onClick={onClose} src={CloseIcon} alt="Close icon" />
                    </div>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modal;
