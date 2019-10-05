import React from 'react';
import MdKey from 'react-ionicons/lib/MdKey'
import './Dialog.css';

const Dialog = (props) => {
  console.log(props)
//Showing modal with the key.
//Conditional set the variable dialog with the div class modal in return if isOpen=True
//if isOpen=false sets dialog on return with value of null.
//Button onClick takes onClose which sets IsOpen to false closing the modal.
  let dialog = (
      <div className="modal">
        <button id="closeBtn" onClick={props.onClose}>X</button>
        <div className="dialogText">
          <p><span>Alright!!!</span><br/> The algorithm has taken the input and sent back your cipher key.</p>
          <div className="icon"><MdKey fontSize="50px" color="white" rotate={true} /></div>
        </div>
        <div className="cipher">
          {props.data}
        </div>
      </div>

  );
  if (! props.isOpen) {
    dialog = null;
}

  return (
      <div>
        {dialog}
      </div>
  );
}

export default Dialog;
