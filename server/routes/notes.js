const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser.js')
const Notes = require('../models/Notes.js')
const { body, validationResult } = require('express-validator');

//ROUTE 1: GET Fetching all the notes for the user at api/notes/fetchNotes, login required
router.get('/fetchNotes', fetchUser, async(req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.send(notes);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//ROUTE 2: POST Creating a note at api/notes/addnote, login required
router.post('/addnote', fetchUser, [
    body('title', 'Title cannot be empty').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        // If there is an error, return the bad request and error 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = await new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//ROUTE 3: PUT Updating a note at api/notes/updatenote/:id, login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        //Create a new note object
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};
        // console.log(note.user)
        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Note not found :/")}
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Error Occured");
    }
})

//ROUTE 4: DELETE Deleting a note at api/notes/deletenote/:id, login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Search for the note that is to be deleted
        let note = await Notes.findById(req.params.id);
        if(!note) {return res.status(404).send("Note not found :/")}
        // Allow deletion only if the note belongs to the user
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "The Note has been deleted", note: note});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Error Occured");
    }
})

module.exports = router