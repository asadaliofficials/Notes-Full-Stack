async function getData() {
	try {
		let response = await fetch('http://localhost:3000/');
		let data = await response.json();
		if (data.message) {
			document.querySelector('.notes-list').innerHTML = 'No Notes Found!';
		} else {
			let notesHTML = ``;
			data.forEach(note => {
				let newNote = `
			<div class="note">
						<div class="note-title">${note.title}</div>
						<div class="note-content">${note.des}</div>
						<div class="note-actions">
							<button onclick='editNote(${JSON.stringify(note)})' class="edit-btn" title="Edit">
								<i class="fas fa-edit"></i>
							</button>
							<button onclick='deleteNote(${note.id})' class="delete-btn" title="Delete">
								<i class="fas fa-trash"></i>
							</button>
						</div>
					</div>
					`;
				notesHTML += newNote;
			});
			document.querySelector('.notes-list').innerHTML = notesHTML;
		}
	} catch (error) {
		console.log('error while fething data:', error);
	}
}
getData();
let isNoteEditing = null;
document.querySelector('.sibmit').addEventListener('click', async e => {
	e.preventDefault();
	let title = document.querySelector('.title').value;
	let des = document.querySelector('.des').value;
	if (title.trim() && des.trim()) {
		document.querySelector('.title').value = '';
		document.querySelector('.des').value = '';
		if (!isNoteEditing) {
			createNote(title, des);
		} else {
			updateNote(isNoteEditing, title, des);
			isNoteEditing = null;
		}
	}
});

async function createNote(title, des) {
	try {
		let response = await fetch('http://localhost:3000/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				des: des,
			}),
		});
		console.log(response.statusText);
		getData();
	} catch (error) {
		console.log('error while creating note:', error);
	}
}

async function deleteNote(id) {
	try {
		let response = await fetch('http://localhost:3000/', {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
			}),
		});
		console.log(response.statusText);
		getData();
	} catch (error) {
		console.log('error while deleting note:', error);
	}
}
function editNote(note) {
	document.querySelector('.title').value = note.title;
	document.querySelector('.des').value = note.des;
	isNoteEditing = note.id;
}

async function updateNote(id, title, des) {
	let response = await fetch('http://localhost:3000/', {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			id: id,
			title: title,
			des: des,
		}),
	});
	console.log(response.statusText);
	getData();
}
