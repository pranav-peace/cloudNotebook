import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import NoteItem from "./NoteItem";

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  
  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleClick = (event) => {
      event.preventDefault();
      refClose.current.click();
      editNote(note.id, note.etitle, note.edescription, note.etag);
      props.showAlert("Note Updated Successfully", "success");
  }
  const onChange = (event) => {
      setNote({...note, [event.target.name]: event.target.value});
  }
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Note Hidden Button
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleClick}> 
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center"><h4>Notes</h4></div>
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <NoteItem updateNote={updateNote} key={note._id} note={note} />
          );
        })}
      </div>
    </>
  );
};
