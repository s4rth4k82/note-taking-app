import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
	const [noteTitle, setNoteTitle] = useState('');
	const [noteContent, setNoteContent] = useState('');
	const characterLimit = 200;

	const handleChangeTitle = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteTitle(event.target.value);
		}
	};
	const handleChangeContent = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteContent(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (noteContent.trim().length > 0) {
			handleAddNote(noteTitle, noteContent);
			setNoteContent('');
			setNoteTitle('');
		}
	};

	return (
		<div className='note new'>
			<textarea
				rows='2'
				cols='2.5'
				placeholder='Type to add a Heading...'
				value={noteTitle}
				onChange={handleChangeTitle}
			></textarea>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={noteContent}
				onChange={handleChangeContent}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - noteContent.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
