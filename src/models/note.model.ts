import mongoose, { Schema, Document } from 'mongoose';

export interface Note extends Document {
    title: string;
    content: string;
    date: Date;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true }
});

export default mongoose.model<Note>('Note', NoteSchema);
