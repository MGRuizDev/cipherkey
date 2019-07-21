import React from 'react';
import axios from 'axios';
import Dialog from './Dialog'
import './Form.css';


class KeyForm extends React.Component {

  state = {
    cipherKey : [],
    isOpen: false,
  }


  handleFormSubmit = (event) => {

    event.preventDefault();
    const fNum = event.target.elements.firstNum.value;
    const sNum = event.target.elements.SecondNum.value;
    const tNum = event.target.elements.thirdNum.value;
    const modNum = event.target.elements.modifierNum.value;
    const components = fNum + sNum+ tNum;


//API call to backend to send the components and modifierNum
//The Response retrive the key, and set isOpen to "true" in state to open the modal.
    axios.get("http://127.0.0.1:8000/api", {
        params: {
          components: components,
          modifier: modNum,
        }
        }).then(response => {
                this.setState({
                  cipherKey: response.data,
                  isOpen: true
                });
          })
  }

//This method called from each input will block any character not corresponding to a Hexadecimal number.
  validInput = (event) => {
    const extract = (event.target.value.match("[0-9a-fA-F]+") || []).pop() || '';
    event.target.value = extract;
  }

  render(){
    return (
      <div className="wrapper">
      <div className="container">
        <h2 align="center">Cipher Key</h2>
        <div className="form-section">
          <p>Chose a sixteen byte hexadecimal number for each component. (32 digits number)<br/>
          <small> from:<br/> 100 0000 0000 0000 0000 0000 0000 0000</small><br/>
          <small>to:<br/> FFFF FFFF FFFF FFFF FFFF FFFF FFFF FFFF</small><br/>
          And select a Hex number from 0x00 to 0x0F as modifier to retrive your cipher key.</p>

            <form onSubmit={this.handleFormSubmit}>
              <label>
                First Component:
                <input onChange={this.validInput} name="firstNum" type="text" placeholder="100 0000 0000 0000 0000 0000 0000 0000" required />
              </label>
              <label>
                Second Component:
                <input onChange={this.validInput} name="SecondNum" type="text" placeholder="100 0000 0000 0000 0000 0000 0000 0000" required/>
              </label>
              <label>
                Third Component:
                <input onChange={this.validInput} name="thirdNum" type="text" placeholder="100 0000 0000 0000 0000 0000 0000 0000" required/>
              </label>
              <label>
                Select Modifier:
                <select name="modifierNum" required>
                  <option value="00">00x00</option>
                  <option value="01">00x01</option>
                  <option value="02">00x02</option>
                  <option value="03">00x03</option>
                  <option value="04">00x04</option>
                  <option value="05">00x05</option>
                  <option value="06">00x06</option>
                  <option value="07">00x07</option>
                  <option value="08">00x08</option>
                  <option value="09">00x09</option>
                  <option value="0A">00x0A</option>
                  <option value="0B">00x0B</option>
                  <option value="0C">00x0C</option>
                  <option value="0D">00x0D</option>
                  <option value="0E">00x0E</option>
                  <option value="0F">00x0F</option>
                </select>
              </label>

                <button type="submit">RETRIEVE KEY</button>
            </form>
          </div>
      </div>
        <Dialog data={this.state.cipherKey.key} isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}></Dialog>
    </div>
    )
  }
}

export default KeyForm;
