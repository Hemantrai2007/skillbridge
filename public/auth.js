export const firebaseConfig = {
  apiKey: "AIzaSyDtBgp4yi-N2RBKLKrLva1tKfH8XVthfwU",
  authDomain: "skillbridge-6ffe4.firebaseapp.com",
  projectId: "skillbridge-6ffe4",
  storageBucket: "skillbridge-6ffe4.firebasestorage.app",
  messagingSenderId: "191862685375",
  appId: "1:191862685375:web:f15b7483312551f634900a",
  measurementId: "G-03P7LRJ332"
};
 // Firebase config


// ✅ Prevent multiple initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();


// ✅ Reusable Google login
export function signInWithGoogle(mode = "signup") {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;

      console.log("Google success:", user);

      try {
        console.log("Sending to backend...");

        // ✅ FIXED API
        const res = await fetch("http://localhost:3000/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            uid: user.uid
          })
        });

        const data = await res.json();
        console.log("Backend response:", data);

        // ✅ Store user (important)
        localStorage.setItem("user", JSON.stringify(data));

      } catch (err) {
        console.error("Fetch error:", err);
      }

      // ✅ Redirect based on page
      if (mode === "signup") {
        window.location.href = "requirement.html";
      } else {
        window.location.href = "dashboard.html";
      }

    })
    .catch((error) => {
      console.error("Google error:", error);
    });
}