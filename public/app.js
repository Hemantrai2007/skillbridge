async function loadMatches() {
    const feed = document.getElementById('match-feed');
    const loader = document.getElementById('loader');

    try {
        const response = await fetch('/api/matches/1'); // Fetching for Hemant (ID: 1)
        const matches = await response.json();
        
        loader.style.display = 'none';

        matches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'card profile-card';
            card.innerHTML = `
                <div class="match-score">${match.matchScore}% Match</div>
                <div class="profile-img"><i class="fa-solid fa-user-graduate"></i></div>
                <div class="profile-details">
                    <div>
                        <h2 style="margin:0; color:var(--primary);">${match.name}, ${match.age}</h2>
                        <p style="color:#aaa; font-size:14px;">${match.bio} • ${match.location}</p>
                        <hr style="border:0; border-top:1px solid #333; margin:15px 0;">
                        <p style="margin:0; color:#888; font-size:12px;">EXPERT IN:</p>
                        <p class="skill-tag">${match.teaches.join(', ')}</p>
                        <p style="margin:10px 0 0 0; color:#888; font-size:12px;">WANTS TO LEARN:</p>
                        <p style="color:#1890ff; font-weight:600;">${match.wants.join(', ')}</p>
                    </div>
                    <button class="btn-interest" onclick="sendInterest(this, '${match.name}')">Express Interest</button>
                </div>
            `;
            feed.appendChild(card);
        });
    } catch (err) {
        console.error("Match Engine Error:", err);
    }
}

function sendInterest(btn, name) {
    btn.style.background = "#444";
    btn.innerHTML = "Interest Sent ✔";
    btn.disabled = true;
    alert(`Success! We have notified ${name} of your interest.`);
}

// Function to handle the search
function handleSearch() {
    const query = document.getElementById('pc-search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.profile-card');

    cards.forEach(card => {
        const content = card.innerText.toLowerCase();
        // Simple logic: if text exists in card, show it; otherwise hide it.
        card.style.display = content.includes(query) ? 'flex' : 'none';
    });
}

// Optional: Search as you type (Real-time)
document.getElementById('pc-search-input').addEventListener('keyup', (e) => {
    handleSearch();
});

document.addEventListener('DOMContentLoaded', loadMatches);