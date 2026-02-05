const API_URL = 'https://dynamic-notes-app.onrender.com';


// Select elements
const buttonT = document.querySelector('#addNoteBtn');
const titleInput = document.querySelector('#noteTitle');
const contentInput = document.querySelector('#noteContent');
const notesContainer = document.querySelector('.notes-container');

// Function to add a note
async function addNote() {
    const title = titleInput.value;
    const content = contentInput.value;

    if (!title || !content) {
        alert('Fill all fields');
        return;
    }

    const token = localStorage.getItem('token'); // from login

    const res = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    renderNote(data);   // function to render note
}
function renderNote(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    noteDiv.innerHTML = `
    <small>${new Date(note.createdAt).toLocaleString()}</small>
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <button onclick="deleteNote('${note._id}')">Delete</button>
  `;

    notesContainer.prepend(noteDiv);
}

// Event listener
buttonT.addEventListener('click', addNote);

async function loadNotes() {
    const res = await fetch(`${API_URL}/api/notes`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const notes = await res.json();
    notes.forEach(renderNote);
}

loadNotes();

async function deleteNote(id) {
    await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    location.reload();
}

