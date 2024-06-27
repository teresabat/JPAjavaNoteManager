document.addEventListener('DOMContentLoaded', function() {
	const noteForm = document.getElementById('note-form');
	const notesList = document.getElementById('notes-list');

	noteForm.addEventListener('submit', async function(event) {
		event.preventDefault();
		const title = document.getElementById('title').value;
		const content = document.getElementById('content').value;

		const response = await fetch('/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, content })
		});

		const note = await response.json();
		addNoteToList(note);

		noteForm.reset();
	});

	async function fetchNotes() {
		const response = await fetch('/notes');
		const notes = await response.json();
		notes.forEach(note => addNoteToList(note));
	}

	function addNoteToList(note) {
		const noteElement = document.createElement('div');
		noteElement.className = 'note';
		noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <button onclick="deleteNote(${note.id}, this)">Delete</button>
        `;
		notesList.appendChild(noteElement);
	}

	window.deleteNote = async function(id, button) {
		await fetch(`/notes/${id}`, {
			method: 'DELETE'
		});

		button.parentElement.remove();
	};

	fetchNotes();
});
