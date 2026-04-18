document.addEventListener('DOMContentLoaded', () => {
    // Profile Navigation
    const profileTrigger = document.getElementById('profile-trigger');
    const navMatches = document.getElementById('nav-matches');
    const navInbox = document.getElementById('nav-inbox');
    
    // Profile Elements
    const editProfileBtn = document.getElementById('edit-profile-btn');

    // Navigate to matches
    if (navMatches) {
        navMatches.onclick = (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }

    // Navigate to chat
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
            // You can add a modal or redirect to an edit page here
        };
    }

    // Profile Data (Can be fetched from API)
    const userProfile = {
        name: "Hemant Rai",
        bio: "B.Tech Computer Science | DSEU Delhi",
        teaches: ["React.js", "Node.js", "Arduino Robotics", "C++ Programming"],
        wants: ["Python ML", "UI/UX Design"],
        about: "I am a passionate CS student focused on bridging the gap between hardware (Robotics) and software (Full-stack Web Dev). Currently building SkillBridge Pro to help students trade knowledge.",
        verified: true,
        isPro: true
    };

    console.log("Profile loaded:", userProfile);
});
