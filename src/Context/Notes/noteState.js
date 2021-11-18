import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = [];  
  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getAllNotes = async () => {
    //API call
    const response = await fetch(`${host}api/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODA3YWIzZmI5MTgyM2MzOWJlNmM4In0sImlhdCI6MTYzNDQ2NjcyOX0.v92goK322MDabkNwHh80SypbKrZ53FewKDQaqQcpxAg',
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODA3YWIzZmI5MTgyM2MzOWJlNmM4In0sImlhdCI6MTYzNDQ2NjcyOX0.v92goK322MDabkNwHh80SypbKrZ53FewKDQaqQcpxAg',
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();      
    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODA3YWIzZmI5MTgyM2MzOWJlNmM4In0sImlhdCI6MTYzNDQ2NjcyOX0.v92goK322MDabkNwHh80SypbKrZ53FewKDQaqQcpxAg',
      }
    });
    const json = response.json();
    console.log(json);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODA3YWIzZmI5MTgyM2MzOWJlNmM4In0sImlhdCI6MTYzNDQ2NjcyOX0.v92goK322MDabkNwHh80SypbKrZ53FewKDQaqQcpxAg',
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = response.json();
    console.log(json);

    //Logic to edit a Note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    setNotes(notes);
  }
  return(
      <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getAllNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;