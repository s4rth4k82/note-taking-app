import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const Note = ({
  id,
  title: initialTitle,
  content: initialContent,
  date,
  handleUpdateNote,
  handleDeleteNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const characterLimit = 200;

  const handleChangeTitle = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setTitle(event.target.value);
    }
  };

  const handleChangeContent = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setContent(event.target.value);
    }
  };

  const handleSaveNote = async () => {
    await handleUpdateNote(id, title, content);
    await setIsEditing(false);
  };

  return (
    <div className="note" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <div>
          <textarea
            className="title-textarea"
            rows="2"
            cols="30"
            value={title}
            onChange={handleChangeTitle}
          ></textarea>
          <textarea
            className="content-textarea"
            rows="8"
            cols="30"
            value={content}
            onChange={handleChangeContent}
          ></textarea>
          <div className="note-footer">
            <small>{characterLimit - content.length} Remaining</small>
            <button className="save" onClick={handleSaveNote}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <span>{title}</span>
          <span>{content}</span>
          <div className="note-footer">
            <small>{date}</small>
            <MdDeleteForever
              onClick={() => handleDeleteNote(id)}
              className="delete-icon"
              size="1.3em"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
