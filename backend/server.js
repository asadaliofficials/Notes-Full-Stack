const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
let notes = [];

// get all notes
app.get('/', (req, res) => {
	if (notes.length > 0) {
		res.json(notes);
	} else {
		res.json({ message: 'no notes availabe!' });
	}
});

// add note

app.post('/', (req, res) => {
	let { title, des } = req.body;
	let id = notes.length + 1;
	let newNote = {
		id: id,
		title: title,
		des: des,
	};
	notes.unshift(newNote);
	console.log('new note created...');
	res.send('note created successfully...🎉');
});

// delete note

app.delete('/', (req, res) => {
	let { id } = req.body;
	id = Number(id);
	let newNotes = notes.filter(note => {
		return note.id !== id;
	});
	notes = newNotes;
	console.log('note deleted...');
	res.send('note deleted successfully...💀');
});

// update note

app.patch('/', (req, res) => {
	let { id, title, des } = req.body;
	id = Number(id);
	let newNotes = notes.map(note => {
		if (note.id === id) {
			note.title = title;
			note.des = des;
			return note;
		} else {
			return note;
		}
	});
	notes = newNotes;
	console.log('note edited...');

	res.send('note edited successfully...🔥');
});

app.listen(3000, () => {
	console.log('server is running...');
});
