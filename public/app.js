document.addEventListener('DOMContentLoaded', () => {
    // Load Matches on Dashboard
    function loadMatches() {
        const container = document.getElementById('matches-container');
        const loader = document.getElementById('loader');
        
        // Sample match data - can be replaced with API call
        const data = [
            { name: "Ananya", age: 21, matchScore: 95, teaches: ["Python", "ML"], bio: "DSEU Student", location: "Delhi" },
            { name: "Rahul", age: 22, matchScore: 88, teaches: ["UI/UX", "Figma"], bio: "Designer", location: "Noida" },
            { name: "Priya", age: 20, matchScore: 82, teaches: ["Web Design", "Figma"], bio: "UI/UX Designer", location: "Delhi" }
        ];
        
        loader.style.display = 'none';
        
        data.forEach(match => {
            const card = document.createElement('div');
            card.className = 'profile-card';
            card.innerHTML = `
                <div class="match-score">${match.matchScore}% Match</div>
                <div class="profile-img"><i class="fa-solid fa-user-graduate"></i></div>
                <div class="profile-details">
                    <div>
                        <h2 style="color:var(--primary); margin:0;">${match.name}, ${match.age}</h2>
                        <p style="color:#aaa;">${match.bio} • ${match.location}</p>
                        <p class="skill-tag">${match.teaches.join(', ')}</p>
                    </div>
                    <button class="btn-upgrade" style="background:var(--primary); width:100%">Express Interest</button>
                </div>`;
            container.appendChild(card);
        });
    }
    
    loadMatches();
});