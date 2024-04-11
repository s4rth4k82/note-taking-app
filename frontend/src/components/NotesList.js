import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes,
	handleAddNote,
	handleUpdateNote,
	handleDeleteNote,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					key={note._id}
					id={note._id}
					title={note.title}
					content={note.content}
					date={note.date}
					handleUpdateNote={handleUpdateNote}
					handleDeleteNote={handleDeleteNote}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;
