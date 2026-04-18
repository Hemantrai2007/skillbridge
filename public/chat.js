document.addEventListener('DOMContentLoaded', () => {
    // Chat Navigation
    const profileTrigger = document.getElementById('profile-trigger');
    const navMatches = document.getElementById('nav-matches');
    
    // Chat Elements
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const camBtn = document.getElementById('cam-btn');
    const fileUpload = document.getElementById('file-upload');

    // Navigate to Profile
    if (profileTrigger) {
        profileTrigger.onclick = () => {
            window.location.href = 'profile.html';
        };
    }

    // Navigate to Matches
    if (navMatches) {
        navMatches.onclick = (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }

    // Send Message Function
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text !== "") {
            const msg = document.createElement('div');
            msg.className = 'message sent';
            msg.textContent = text;
            chatBox.appendChild(msg);
            chatInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Simple Auto-Reply
            setTimeout(() => {
                const reply = document.createElement('div');
                reply.className = 'message received';
                reply.textContent = "Awesome! Let's talk more about this.";
                chatBox.appendChild(reply);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1000);
        }
    }

    // Event Listeners
    if (sendBtn) {
        sendBtn.onclick = sendMessage;
    }

    if (chatInput) {
        chatInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        };
    }

    if (camBtn) {
        camBtn.onclick = () => {
            alert("Camera initialized...");
        };
    }

    if (fileUpload) {
        fileUpload.onchange = (e) => {
            if (e.target.files[0]) {
                alert("File selected: " + e.target.files[0].name);
            }
        };
    }

    // Chat Data (Can be fetched from API)
    const chats = [
        {
            id: 1,
            name: "Ananya",
            lastMessage: "Perfect. Let's trade!",
            time: "10:45 AM",
            status: "online"
        },
        {
            id: 2,
            name: "Rahul",
            lastMessage: "React help needed...",
            time: "Yesterday",
            status: "offline"
        }
    ];

    console.log("Chat loaded with conversations:", chats);
});
