document.addEventListener('DOMContentLoaded', () => {
    // Profile Navigation
    const navMatches = document.getElementById('nav-matches');
    const navInbox = document.getElementById('nav-inbox');
    
    // Profile Elements
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const profileAbout = document.getElementById('profile-about');
    const profileInitials = document.getElementById('profile-initials');
    const navProfileInitials = document.getElementById('nav-profile-initials');
    const profileBadges = document.getElementById('profile-badges');
    const teachSkillsContainer = document.getElementById('teach-skills');
    const learnSkillsContainer = document.getElementById('learn-skills');

    // Profile Data
    const userProfile = {
        name: "Hemant Rai",
        bio: "B.Tech Computer Science | DSEU Delhi",
        teaches: ["React.js", "Node.js", "Arduino Robotics", "C++ Programming"],
        wants: ["Python ML", "UI/UX Design"],
        about: "I am a passionate CS student focused on bridging the gap between hardware (Robotics) and software (Full-stack Web Dev). Currently building SkillBridge Pro to help students trade knowledge.",
        verified: true,
        isPro: true
    };

    // Helper to get initials
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Function to render profile data
    const renderProfile = (data) => {
        const initials = getInitials(data.name);
        if (profileName) profileName.textContent = data.name;
        if (profileBio) profileBio.innerHTML = `<i class="fa-solid fa-university"></i> ${data.bio}`;
        if (profileAbout) profileAbout.textContent = data.about;
        if (profileInitials) profileInitials.textContent = initials;
        if (navProfileInitials) navProfileInitials.textContent = initials;

        // Render Badges
        if (profileBadges) {
            profileBadges.innerHTML = '';
            if (data.verified) {
                profileBadges.innerHTML += `<span class="badge-verified"><i class="fa-solid fa-check-double"></i> Verified Expert</span>`;
            }
            if (data.isPro) {
                profileBadges.innerHTML += `<span class="badge-pro">PRO Member</span>`;
            }
        }

        // Render Teaching Skills
        if (teachSkillsContainer) {
            teachSkillsContainer.innerHTML = '';
            data.teaches.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'profile-tag';
                span.textContent = skill;
                teachSkillsContainer.appendChild(span);
            });
        }

        // Render Learning Skills
        if (learnSkillsContainer) {
            learnSkillsContainer.innerHTML = '';
            data.wants.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'profile-tag learn';
                span.textContent = skill;
                learnSkillsContainer.appendChild(span);
            });
        }
    };

    // Initial Render
    renderProfile(userProfile);

    // Navigation Logic
    if (navMatches) {
        navMatches.onclick = (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }

    if (navInbox) {
        navInbox.onclick = (e) => {
            e.preventDefault();
            window.location.href = 'chat.html';
        };
    }

    // Edit Profile Button
    if (editProfileBtn) {
        editProfileBtn.onclick = () => {
            alert("Edit Profile feature coming soon!");
        };
    }

    console.log("Profile loaded and rendered:", userProfile);
});
