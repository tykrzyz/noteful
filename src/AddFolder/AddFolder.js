import React from 'react';
import ApiContext from '../ApiContext';
import InputError from '../InputError';

export default class AddFolder extends React.Component{
  static contextType = ApiContext;
  static defaultProps ={
    addFolder: () => {},
    match: {
      params: {}
    }
  }
  render(){
    const addFolder = e => {
      e.preventDefault();
      this.props.history.push('/')
      fetch(`http://localhost:9090/folders`, {
        'method': 'POST',
        'body': JSON.stringify({
          'name': e.target.folderNameInput.value
        }),
        headers: {
          "Content-Type": "application/json"
      }})
      .then(res => {
        if(!res.ok){
          return res.json().then(e => console.error(e))
        }
        return res.json()
      })
      .then(json => this.context.addFolder(json))
    }
    return(
      <InputError>
        <form id='new-folder-form' onSubmit={addFolder}>
          <label htmlFor ='folder-name-input'>Enter name of new folder:</label>
          <input type='text' name='folderNameInput' id='folder-name-input' required/> 
          <button type='submit' id='submit-button'>Submit</button>
        </form>
      </InputError>
    )
  }
}