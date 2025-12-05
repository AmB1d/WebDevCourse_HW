//--Get HTML DOM Element References 
const form = document.getElementById('songForm');
const displayArea = document.getElementById('displayArea'); // Changed from 'list' to generic area
const submitBtn = document.getElementById('submitBtn');
const toggleViewBtn = document.getElementById('toggleViewBtn');

// State Variables
let songs = [];
let currentView = 'table'; // 'table' or 'card'
let currentSort = 'dateAdded'; // Default sort

// 1. Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    // Load from Local Storage
    const storedData = localStorage.getItem('songs');
    if (storedData) {
        songs = JSON.parse(storedData);
    }

    // Attach Event Listeners for Sorting
    document.querySelectorAll('input[name="sortOptions"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderSongs();
        });
    });

    // Initial Render
    renderSongs();
});

// 2. Handle Form Submit (Add OR Edit)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('songId').value;
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const rating = document.getElementById('rating').value;

    if (id) {
        // --- EDIT MODE ---
        const songIndex = songs.findIndex(song => song.id == id); // Use == for loose type check
        if (songIndex > -1) {
            songs[songIndex].title = title;
            songs[songIndex].url = url;
            songs[songIndex].rating = rating;
            // Note: We don't update dateAdded so it stays original
        }
        
        // Reset Button to "Add" mode
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
        submitBtn.classList.replace('btn-warning', 'btn-success');
    } else {
        // --- ADD MODE ---
        const song = {
            id: Date.now(),
            title: title,
            url: url,
            rating: rating,
            dateAdded: Date.now()
        };
        songs.push(song);
    }

    saveAndRender();
    form.reset();
    document.getElementById('songId').value = ''; // Clear hidden ID
});

// 3. Save to LocalStorage and Refresh UI
function saveAndRender() {
    localStorage.setItem('songs', JSON.stringify(songs));
    renderSongs();
}

// 4. Toggle View Mode
toggleViewBtn.addEventListener('click', () => {
    if (currentView === 'table') {
        currentView = 'card';
        toggleViewBtn.innerHTML = '<i class="fas fa-list"></i> Table View';
    } else {
        currentView = 'table';
        toggleViewBtn.innerHTML = '<i class="fas fa-th-large"></i> Cards View';
    }
    renderSongs();
});

// 5. Main Render Function
function renderSongs() {
    displayArea.innerHTML = ''; // Clear current content

    // Sort the array before rendering
    sortSongsArray();

    if (songs.length === 0) {
        displayArea.innerHTML = '<div class="alert alert-info">No songs added yet.</div>';
        return;
    }

    if (currentView === 'table') {
        renderTable();
    } else {
        renderCards();
    }
}

// --- Sorting Logic ---
function sortSongsArray() {
    songs.sort((a, b) => {
        if (currentSort === 'title') {
            return a.title.localeCompare(b.title);
        } else if (currentSort === 'rating') {
            return b.rating - a.rating; // High to Low
        } else {
            return b.dateAdded - a.dateAdded; // Newest first
        }
    });
}

// --- View: Table Render ---
function renderTable() {
    let html = `
    <table class="table table-hover align-middle">
        <thead>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Rating</th>
                <th>Link</th>
                <th class="text-end">Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    songs.forEach(song => {
        const videoId = getYouTubeID(song.url);
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;

        html += `
            <tr>
                <td><img src="${thumbUrl}" class="song-img" alt="thumb"></td>
                <td>${song.title}</td>
                <td><span class="badge bg-info">${song.rating}/10</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-light" onclick="playVideo('${song.url}')">
                        <i class="fas fa-play"></i> Play
                    </button>
                </td>
                <td class="text-end">
                    <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    displayArea.innerHTML = html;
}

// --- View: Cards Render ---
function renderCards() {
    let html = `<div class="row g-4">`;

    songs.forEach(song => {
        const videoId = getYouTubeID(song.url);
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // High quality for cards

        html += `
            <div class="col-md-4">
                <div class="card bg-secondary mb-3 h-100">
                    <img src="${thumbUrl}" class="card-img-top" alt="Song Thumbnail">
                    <div class="card-body">
                        <h5 class="card-title">${song.title}</h5>
                        <p class="card-text">
                            Rating: <span class="badge bg-warning">${song.rating}/10</span>
                        </p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary btn-sm" onclick="playVideo('${song.url}')">
                                <i class="fas fa-play"></i> Watch
                            </button>
                            <div>
                                <button class="btn btn-warning btn-sm" onclick="editSong(${song.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="deleteSong(${song.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    displayArea.innerHTML = html;
}

// --- Helper Functions ---

// 6. Delete Song
function deleteSong(id) {
    if (confirm('Are you sure you want to delete this song?')) {
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

// 7. Edit Song (Populate Form)
function editSong(id) {
    const songToEdit = songs.find(song => song.id === id);
    if (!songToEdit) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Populate inputs
    document.getElementById('title').value = songToEdit.title;
    document.getElementById('url').value = songToEdit.url;
    document.getElementById('rating').value = songToEdit.rating || 5;
    document.getElementById('songId').value = songToEdit.id;

    // Change button to "Update"
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
    submitBtn.classList.replace('btn-success', 'btn-warning');
}

// 8. Extract YouTube Video ID using Regex
function getYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// 9. Open Video in new Window
function playVideo(url) {
    window.open(url, '_blank', 'width=800,height=600');
}