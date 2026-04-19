document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================
    const navMatches = document.getElementById("nav-matches");
    const navInbox = document.getElementById("nav-inbox");

    const editProfileBtn = document.getElementById("edit-profile-btn");
    const profileView = document.getElementById("profile-view");
    const editSection = document.getElementById("edit-profile-section");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    const saveEditBtn = document.getElementById("save-profile-btn");

    const profileName = document.getElementById("profile-name");
    const profileBio = document.getElementById("profile-bio");
    const profileAbout = document.getElementById("profile-about");

    const profileInitials = document.getElementById("profile-initials");
    const navProfileInitials = document.getElementById("nav-profile-initials");

    const teachSkillsContainer = document.getElementById("teach-skills");
    const learnSkillsContainer = document.getElementById("learn-skills");

    


    // =========================
    // HELPER FUNCTION
    // =========================
    function getInitials(name) {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    }


    // =========================
    // RENDER PROFILE DATA
    // =========================
    function renderProfile(user) {

        // Name
        profileName.textContent = capitalizeWords(user.user_name);

        // Email
        profileBio.innerHTML =
            ` ${user.degree} || ${user.place} || <i class="fa-solid fa-envelope"></i> ${user.email} || +91${user.contact}`;

        // Initials
        const initials = getInitials(user.user_name);

        profileInitials.textContent = initials;
        navProfileInitials.textContent = initials;

        // Skills I Teach
        teachSkillsContainer.innerHTML = "";

        user.offeredSkills.forEach(skill => {
            teachSkillsContainer.innerHTML +=
                `<span class="profile-tag">${skill}</span>`;
        });

        learnSkillsContainer.innerHTML = "";
        user.requiredSkills.forEach(skill =>{
            learnSkillsContainer.innerHTML +=
            `<span class="profile-tag">${skill}</span>`;
        });

        // What I Want To Learn
      
        // About
        profileAbout.textContent = user.about_user;
    }
    //======================
    //capitalized funtion
    //======================
    function capitalizeWords(text) {
    return text
        .toLowerCase()
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}


    // =========================
    // LOAD PROFILE FROM BACKEND
    // =========================
    async function loadProfile() {

        const email = localStorage.getItem("gmail");

        if (!email) {
            alert("Please login first");
            window.location.href = "signin.html";
            return;
        }

        try {

            const res = await fetch(
                "http://localhost:8000/auth/profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                }
            );

            const data = await res.json();

            if (data.success) {
                renderProfile(data.user);
                console.log("Profile loaded successfully");
            } else {
                alert("User not found");
            }

        } catch (error) {
            console.log(error);
            alert("Server connection failed");
        }
    }


    // =========================
    // NAVIGATION
    // =========================
    if (navMatches) {
        navMatches.onclick = (e) => {
            e.preventDefault();
            window.location.href = "index.html";
        };
    }

    if (navInbox) {
        navInbox.onclick = (e) => {
            e.preventDefault();
            window.location.href = "chat.html";
        };
    }

    // =========================
    // EDIT MODE LOGIC
    // =========================
    if (editProfileBtn) {
        editProfileBtn.onclick = () => {
            if (profileView && editSection) {
                profileView.style.display = "none";
                editSection.style.display = "block";
            }
        };
    }

    if (cancelEditBtn) {
        cancelEditBtn.onclick = () => {
            if (profileView && editSection) {
                profileView.style.display = "block";
                editSection.style.display = "none";
            }
        };
    }


    saveEditBtn.addEventListener("click", async () => {

    const email =
        localStorage.getItem("gmail");

    const user_name =
        document.getElementById("edit-name").value;

    const place =
        document.getElementById("edit-place").value;

     const degree =
        document.getElementById("edit-degree").value;

    const about_user =
        document.getElementById("edit-about").value;

    const requiredSkills = [
        document.getElementById("edit-required").value
    ];

    const offeredSkills = [
        document.getElementById("edit-offered").value
    ];

    const contact = document.getElementById("edit-no.").value;
    

    const dob =
    document.getElementById("edit-age").value;
    
    // Calculate Age
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age =
    today.getFullYear() -birthDate.getFullYear();
    
    const monthDiff = today.getMonth() -birthDate.getMonth();
    
    if (monthDiff < 0 ||(monthDiff === 0 &&today.getDate() < birthDate.getDate())){
       age--;
    }
   

    try {

        const res = await fetch(
            "http://localhost:8000/auth/edit_profile",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    user_name,
                    email,
                    age,
                    requiredSkills,
                    offeredSkills,
                    about_user,
                    place,
                    degree,
                    contact
                })
            }
        );
       
        const data = await res.json();

        if(data.success){
            loadProfile();
            setTimeout(()=>{
                location.reload();
            },4000);
        } else {
            alert(data.message);
        }

    } catch(error){
        console.log(error);
        alert("Server Error");
    }

});

    

    // =========================
    // INITIAL CALL
    // =========================
    loadProfile();

});
