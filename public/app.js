document.addEventListener('DOMContentLoaded', () => {
    let allMatches = [];
    let currentUserEmail = localStorage.getItem('gmail') || null;

    // Calculate profile completion percentage
    function calculateProfileCompletion(user) {
        let completed = 0;
        let total = 6; // Total fields to check
        
        if (user.user_name && user.user_name.trim()) completed++;
        if (user.age && user.age.trim()) completed++;
        if (user.place && user.place.trim()) completed++;
        if (user.about_user && user.about_user.trim()) completed++;
        if (user.offeredSkills && user.offeredSkills.length > 0) completed++;
        if (user.requiredSkills && user.requiredSkills.length > 0) completed++;
        
        return Math.round((completed / total) * 100);
    }

    // Generate suggestions based on profile
    function generateSuggestions(user, completionPercent) {
        const suggestions = [];
        
        if (completionPercent < 100) {
            if (!user.user_name || !user.user_name.trim()) {
                suggestions.push("Add your name to your profile");
            }
            if (!user.age || !user.age.trim()) {
                suggestions.push("Add your age for better matches");
            }
            if (!user.place || !user.place.trim()) {
                suggestions.push("Add your location");
            }
            if (!user.about_user || !user.about_user.trim()) {
                suggestions.push("Write something about yourself");
            }
            if (!user.offeredSkills || user.offeredSkills.length === 0) {
                suggestions.push("Add skills you can teach");
            }
            if (!user.requiredSkills || user.requiredSkills.length === 0) {
                suggestions.push("Add skills you want to learn");
            }
        } else {
            suggestions.push("Your profile is complete!");
            suggestions.push("Start exploring matches");
        }
        
        return suggestions.slice(0, 3); // Return top 3 suggestions
    }

    // Load and display welcome section
    async function loadWelcome() {
        const welcomeSection = document.getElementById('welcome-section');
        console.log('Loading welcome. Email from localStorage:', currentUserEmail);
        
        if (!currentUserEmail) {
            // No user logged in, show default welcome
            console.log('No email found, showing guest welcome');
            document.getElementById('user-name').textContent = 'Guest';
            document.getElementById('nav-profile-initials').textContent = 'G';
            document.getElementById('completion-percent').textContent = '0';
            document.getElementById('completion-suggestion').textContent = 'Sign in to see your profile and get personalized matches.';
            document.getElementById('suggestions-list').innerHTML = `
                <li>Sign in to your account</li>
                <li>Complete your profile</li>
                <li>Start finding matches</li>
            `;
            
            // Set default stat cards
            document.getElementById('stat-profile').textContent = '0%';
            document.getElementById('stat-offered').textContent = '0';
            document.getElementById('stat-required').textContent = '0';
            document.getElementById('stat-learned').textContent = '0';
            
            welcomeSection.style.display = 'block';
            return;
        }

        try {
            console.log('Fetching profile for email:', currentUserEmail);
            const response = await fetch('http://localhost:8000/auth/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentUserEmail })
            });
            
            const data = await response.json();
            console.log('Profile response:', data);
            
            if (data.success) {
                const user = data.user;
                const completionPercent = calculateProfileCompletion(user);
                const suggestions = generateSuggestions(user, completionPercent);
                
                // Update welcome section
                document.getElementById('user-name').textContent = user.user_name || 'User';
                
                // Update sidebar profile circle with user initials
                const initials = (user.user_name || 'U').split(' ').map(n => n[0]).join('').toUpperCase();
                document.getElementById('nav-profile-initials').textContent = initials;
                
                document.getElementById('completion-percent').textContent = completionPercent;
                document.getElementById('progress-fill').style.width = completionPercent + '%';
                
                // Update suggestion message
                const suggestionElement = document.getElementById('completion-suggestion');
                if (completionPercent === 100) {
                    suggestionElement.textContent = "Your profile is complete! Ready to find matches.";
                } else {
                    const skillsNeeded = 6 - (
                        (user.user_name ? 1 : 0) +
                        (user.age ? 1 : 0) +
                        (user.place ? 1 : 0) +
                        (user.about_user ? 1 : 0) +
                        (user.offeredSkills?.length ? 1 : 0) +
                        (user.requiredSkills?.length ? 1 : 0)
                    );
                    suggestionElement.textContent = `Add ${skillsNeeded} more ${skillsNeeded === 1 ? 'field' : 'fields'} to get better matches`;
                }
                
                // Update suggestions list
                const suggestionsList = document.getElementById('suggestions-list');
                suggestionsList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
                
                // Update stat cards
                document.getElementById('stat-profile').textContent = completionPercent + '%';
                document.getElementById('stat-offered').textContent = (user.offeredSkills?.length || 0);
                document.getElementById('stat-required').textContent = (user.requiredSkills?.length || 0);
                document.getElementById('stat-learned').textContent = '0'; // TODO: Add learned skills tracking
                
                welcomeSection.style.display = 'block';
            } else {
                welcomeSection.style.display = 'block';
            }
        } catch (error) {
            console.error('Error loading welcome:', error);
            welcomeSection.style.display = 'block';
        }
    }

    // Function to render matches
    // Open modal with match details
    function openMatchModal(match) {
        const modal = document.getElementById('match-modal');
        
        // Populate modal with match details
        document.getElementById('modal-name').textContent = `${match.name}, ${match.age}`;
        document.getElementById('modal-location').textContent = match.location;
        document.getElementById('modal-bio').textContent = match.bio;
        
        // Populate teaching skills
        const teachingDiv = document.getElementById('modal-teaching');
        teachingDiv.innerHTML = match.teaches.map(skill => 
            `<span class="modal-skill-tag">${skill}</span>`
        ).join('');
        
        // Populate learning skills
        const learningDiv = document.getElementById('modal-learning');
        learningDiv.innerHTML = match.wants.map(skill => 
            `<span class="modal-skill-tag">${skill}</span>`
        ).join('');
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeMatchModal() {
        const modal = document.getElementById('match-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function renderMatches(matchesToRender) {
        const container = document.getElementById('matches-container');
        container.innerHTML = '';
        
        if (matchesToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #aaa; padding: 20px;">No matches found for your search.</p>';
            return;
        }
        
        matchesToRender.forEach(match => {
            const card = document.createElement('div');
            card.className = 'profile-card-no-img';
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="profile-details-full">
                    <div>
                        <h2 style="color:var(--primary); margin:0;">${match.name}, ${match.age}</h2>
                        <p style="color:#aaa;">${match.bio} • ${match.location}</p>
                        <p class="skill-tag"><strong>Teaching:</strong> ${match.teaches.join(', ')}</p>
                        <p class="skill-tag"><strong>Learning:</strong> ${match.wants.join(', ')}</p>
                    </div>
                    <button class="btn-upgrade" style="background:var(--primary); width:100%">Express Interest</button>
                </div>`;
            
            // Add click handler to open modal
            card.addEventListener('click', () => openMatchModal(match));
            
            container.appendChild(card);
        });
    }

    // Show matches view and hide welcome
    function showMatchesView() {
        document.getElementById('welcome-section').style.display = 'none';
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) statsGrid.style.display = 'none';
        document.getElementById('match-feed-view').style.display = 'block';
        loadMatches();
    }

    // Show welcome view and hide matches
    function showWelcomeView() {
        document.getElementById('welcome-section').style.display = 'block';
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) statsGrid.style.display = 'grid';
        document.getElementById('match-feed-view').style.display = 'none';
    }

    // Fetch matches from database
    async function loadMatches() {
        const loader = document.getElementById('loader');
        loader.style.display = 'block';
        
        try {
            const response = await fetch('http://localhost:8000/auth/matches');
            const data = await response.json();
            
            if (data.success) {
                allMatches = data.matches;
                loader.style.display = 'none';
                renderMatches(allMatches);
            } else {
                loader.innerHTML = 'Failed to load matches';
            }
        } catch (error) {
            console.error('Error fetching matches:', error);
            loader.innerHTML = 'Error loading matches';
        }
    }

    // Search Functionality
    const searchInput = document.getElementById('pc-search-input');
    let searchActive = false;

    searchInput.addEventListener('focus', () => {
        // Show matches view when user focuses on search
        if (!searchActive) {
            searchActive = true;
            showMatchesView();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase().trim();
        
        if (searchQuery === '') {
            // Show welcome view when search is cleared
            showWelcomeView();
            renderMatches(allMatches);
            searchActive = false;
            return;
        }
        
        const filteredMatches = allMatches.filter(match => {
            const skillsMatch = match.teaches.some(skill => skill.toLowerCase().includes(searchQuery));
            const wantsMatch = match.wants.some(skill => skill.toLowerCase().includes(searchQuery));
            
            return skillsMatch || wantsMatch;
        });
        
        renderMatches(filteredMatches);
    });

    // Modal event listeners
    const modal = document.getElementById('match-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    modalCloseBtn.addEventListener('click', closeMatchModal);
    modalOverlay.addEventListener('click', closeMatchModal);

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            closeMatchModal();
        }
    });
    
    loadWelcome();
});