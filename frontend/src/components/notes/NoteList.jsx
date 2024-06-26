import PropTypes from "prop-types";
import parse from "html-react-parser";
import axios from "axios";
import TiptapEdited from "../TiptapEdited";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";

const NoteList = ({ notes, allNotes }) => {
  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      await allNotes();
      toast.success("Note deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error deleting Note!");
    }
  };

  const [editing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(null);

  const handleEdit = async (note) => {
    try {
      setEditedNote(note);
      setEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Notes</h2>
      <ul className="space-y-2">
        {editing ? (
          <TiptapEdited
            notes={notes}
            allNotes={allNotes}
            note={editedNote}
            editing={editing}
            setEditing={setEditing}
          />
        ) : (
          notes &&
          notes.map((note) => (
            <li
              key={note._id}
              className=" bg-gray-400 shadow-md rounded-lg px-4 py-2 flex items-center justify-between hover:shadow-lg transition duration-300"
            >
              <span className="text-lg">{parse(note.content)}</span>
              <div>
                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-500 font-medium mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <Toaster />
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.func.isRequired,
  allNotes: PropTypes.func.isRequired,
};

export default NoteList;
