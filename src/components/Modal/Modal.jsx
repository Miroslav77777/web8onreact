import React from 'react';
import classes from './Modal.module.css'; // Импортируем стили
import ContactForm from '../Form/Form';
import Close from "../../assets/Close.svg"


const Modal = ({ onClose }) => { // Добавляем prop onClose для закрытия
  return (
    <div className={classes.modal}>
      <button onClick={onClose}>
        <img src={Close}></img>
      </button>
      <ContactForm />
    </div>
  );
};

export default Modal;