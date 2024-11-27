import React, { useState } from 'react';
import './Discount.css';
import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

export default function Discount() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleHideModal = () => {
       setShowModal(false); 
    };

  return (
    <div className="discount">
      <div className="textlink">
        <a onClick={handleShowModal}>Скидка от 20% на всю продукцию после регистрации</a>
      </div>
      <div className="button-discount">
        <button onClick={handleShowModal}>Получить скидку 20%</button>
      </div>

      {showModal && (
        <>
          <Backdrop onClick={handleHideModal} />
          <Modal onClose={handleHideModal} /> {/* Передаем onClose */}
        </>
      )}
    </div>
  );
}