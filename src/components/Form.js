import React from 'react';
import axios from 'axios';
import Dialog from './Dialog'
import './Form.css';


class KeyForm extends React.Component {

  state = {
    cipherKey : [],
    isOpen: false,
  }


  encodeFormSubmit = (event) => {

    event.preventDefault();
    const NumToEncode = event.target.elements.NumberToEncode.value;


//API call to backend to send the values
//The Response retrive the key, and set isOpen to "true" in state to open the modal.
    axios.get("http://127.0.0.1:8000/api/encode/", {
        params: {
          NumToEncode: NumToEncode,
        }
        }).then(response => {
                this.setState({
                  cipherKey: response.data,
                  isOpen: true
                });
          })
  }


  decodeFormSubmit = (event) => {
    event.preventDefault();
    const Num1T0Decode = event.target.elements.FirstNumberToDecode.value;
    const Num2ToDecode = event.target.elements.SecondNumberToDecode.value;


//API call to backend to send the components and modifierNum
//The Response retrive the key, and set isOpen to "true" in state to open the modal.
    axios.get("http://127.0.0.1:8000/api/decode/", {
        params: {
          Num1T0Decode: Num1T0Decode,
          Num2ToDecode: Num2ToDecode,
        }
        }).then(response => {
                this.setState({
                  cipherKey: response.data,
                  isOpen: true
                });
          })
  }

//This method called from each input will block any character not corresponding to a Hexadecimal number.
  validEncodedInput = (event) => {
    const extract = (event.target.value.match("[-0-90-9a-fA-F]+") || []).pop() || '';
      event.target.value = extract;
  }

  validDecodedInput = (event) => {
    const extract = (event.target.value.match("[0-9a-fA-F]+") || []).pop() || '';
      event.target.value = extract;
  }

  render(){
    return (
      <div className="wrapper">
      <div className="container">
        <h2 align="center">Cipher Key</h2>
        <div className="form-section">
          <p>This app will receive ether a 14-bit signed number from range -8192 to 8191 to encode into a 4 digits hexadecimal string
          , or it will accept two hexadecimal numbers in the range of 00 to 7f and decode them to a decimal number.</p>

            <form onSubmit={this.encodeFormSubmit}>
              <label>
                Number To Encode:
                <input onChange={this.validEncodedInput} name="NumberToEncode" type="text" placeholder="-8192 to 8191" required/>
                <button type="submit">RETRIEVE ENCODED VALUE</button>
              </label>
            </form>
            <form onSubmit={this.decodeFormSubmit}>
              <label>
                Numbers To Decode:
                <input onChange={this.validDecodedInput} name="FirstNumberToDecode" type="text" placeholder="00 to 7f" required/>
                <input onChange={this.validDecodedInput} name="SecondNumberToDecode" type="text" placeholder="00 to 7f" required/>
                <button type="submit">RETRIEVE DECODED VALUE</button>
              </label>
            </form>
          </div>
      </div>
        <Dialog data={this.state.cipherKey.key} isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}></Dialog>
    </div>
    )
  }
}

export default KeyForm;
