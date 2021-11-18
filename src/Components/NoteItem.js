import React, { useContext } from "react";
import { Link } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            <i className="far fa-trash-alt" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
          {/* <h6 className="card-subtitle mb-2 text-muted">{note.}</h6> //Subtitle line will probably use later for some*/}
          <p className="card-text">{note.description}</p>
          <Link to="/" className="card-link">
            Card link
          </Link>
          <Link to="/" className="card-link">
            Another link
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
