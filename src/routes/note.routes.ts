import { createNote, getNote, getAllNotes, updateNote, deleteNote } from '../controllers/note.controller';
const express=require("express")

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes/:id', getNote);
router.get('/notes', getAllNotes);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;
