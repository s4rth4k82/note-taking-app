import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // const savedNotes = JSON.parse(
    // 	localStorage.getItem('react-notes-app-data')
    // );

    // if (savedNotes) {
    // 	setNotes(savedNotes);
    // }

    getAllNotes();
  }, []);

  const getAllNotes = () => {
    axios
      .get("http://localhost:5000/api/notes")
      .then((res) => {
        console.log("ALL", res.data);
        setAllNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.setItem("react-notes-app-data", JSON.stringify(allNotes));
  };

  const addNote = (title, content) => {
    axios
      .post("http://localhost:5000/api/notes", {
        title: title,
        content: content,
        date: new Date().toLocaleDateString(),
      })
      .then(() => {
        getAllNotes()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateNote = (id, title, content) => {
    axios
      .put(`http://localhost:5000/api/notes/${id}`, {
        title: title,
        content: content,
        date: new Date().toLocaleDateString(),
      })
      .then(() => {
        getAllNotes()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = (id) => {
    console.log("first", id);
    axios
      .delete(`http://localhost:5000/api/notes/${id}`, {
        data: {
          id: id,
        },
      })
      .then(() => {
        getAllNotes()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        {/* <Search handleSearchNote={setSearchText} /> */}
        <NotesList
          notes={allNotes}
          handleAddNote={addNote}
		  handleUpdateNote={updateNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
