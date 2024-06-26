import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Note from '../models/note.model';

export const createNote = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const note = new Note({
            content
        });
        await note.save();
        return res.status(201).json(note);
    } catch (error) {
        console.log("This is the error", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const note = await Note.find()
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { title, content, date } = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id, { title, content, date });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = new mongoose.Types.ObjectId(req.params.id)
        const note = await Note.findOneAndDelete({"_id": noteId});
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(204).end();
    } catch (error) {
        console.log("This is the Delete error", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
