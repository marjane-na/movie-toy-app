import React from 'react';
import Button from "./Button";

const Modal = ({onClick, requestError}) => {
  return <div className="c-modal">
    <div className="c-modal__body">
      <div className="c-modal__body__text">
        {requestError ? "Something went wrong with your request. Please try again." :
         "You can add up to 5 nominees."}
      </div>
      <Button className="c-modal__body__btn" isGreen={true} text={"OK"} onClick={onClick} isWhite={true}/>
    </div>
  </div>;
};

export default Modal;
