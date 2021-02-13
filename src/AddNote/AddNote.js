import React from 'react';
import ApiContext from '../ApiContext';
import InputError from '../InputError';

export default class AddNote extends React.Component{
  static contextType = ApiContext;
  static defaultProps ={
    folders: [],
    addNote: () => {},
    match: {
      params: {}
    }
  }
  render(){
    const addNote = e => {
      e.preventDefault();
      this.props.history.push(`/folder/${folderId}`)
      fetch(`http://localhost:9090/notes`, {
        'method': 'POST',
        'body': JSON.stringify({
          'name': e.target.noteNameInput.value,
          'modified': new Date(),
          'folderId': folderId,
          'content': e.target.noteContent.value
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
      .then(json => this.context.addNote(json))
    }
    const options = this.context.folders.map(folder => {
      return <option key={folder.id} value = {folder.Id} name={folder.name}>{folder.name}</option>
    })

    let folderId = this.context.folders[0] || 0;
    const handleSelectChange = e => {
      folderId = this.context.folders.find(folder => e.target.value === folder.name).id
    }
    return(
      <InputError>
        <form id='new-note-form' onSubmit={addNote}>
          <div>
            <label htmlFor ='noteNameInput'>Enter name of new note:</label>
            <input type='text' name='noteNameInput' id='note-name-input' required/>
          </div>
          <div>
          <label htmlFor='folderSelect'>Select Folder</label>
            <select name='folderSelect' id='folder-select' onChange={handleSelectChange}>
              {options}
            </select>
          </div>
          <div>
            <label htmlFor='noteContent'>Enter Notes</label>
            <br/>
            <textarea name='noteContent' cols='60' rows='10' id='note-content' required/>
          </div>
          <button type='submit' id='submit-button'>Submit</button>
        </form>
      </InputError>
    )
  }
}