import React, { useContext, useState } from 'react';
import noteContext from '../Context/Notes/noteContext';

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note Added Successfully", "success");
    }
    const onChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value});
    }
    return (
      <>
        <form>
          <div className="d-flex justify-content-center"><h3>Add a New Note</h3></div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control w-50" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control w-50" id="description" name="description" value={note.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control w-50" id="tag" name="tag" value={note.tag} onChange={onChange} />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </>
    );
}
