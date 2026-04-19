const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Advanced Mock Database
const users = [
    { 
        id: 1, name: "Hemant Rai", age: 21, location: "Delhi", 
        teaches: ["React", "Node.js"], wants: ["Python", "Machine Learning"],
        bio: "B.Tech CS Student | Robotics Enthusiast", verified: true 
    },
    { 
        id: 2, name: "Siddharth K", age: 33, location: "Noida", 
        teaches: ["Python", "Django"], wants: ["React"],
        bio: "Senior Finance Professional | Tech Learner", verified: true 
    },
    { 
        id: 3, name: "Ananya Singh", age: 24, location: "Delhi", 
        teaches: ["Machine Learning", "Python"], wants: ["Node.js"],
        bio: "Data Scientist at Tech Corp", verified: true 
    },
    { 
        id: 4, name: "Arjun Sharma", age: 28, location: "Gurugram", 
        teaches: ["Java", "Spring Boot"], wants: ["React"],
        bio: "Backend Developer", verified: false 
    }
];


app.get('/api/matches/:id', (req, res) => {
    const currentUser = users.find(u => u.id === parseInt(req.params.id));
    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const matches = users
        .filter(user => user.id !== currentUser.id)
        .map(user => {
            let score = 0;
            // 1. Check if they teach what I want (Primary Match)
            const skillsIWant = currentUser.wants.filter(s => user.teaches.includes(s));
            score += skillsIWant.length * 40;

            // 2. Check if I teach what they want (Reciprocal Match)
            const skillsTheyWant = user.wants.filter(s => currentUser.teaches.includes(s));
            score += skillsTheyWant.length * 20;

            // 3. Location Bonus
            if (user.location === currentUser.location) score += 10;

            return { ...user, matchScore: Math.min(score, 100) };
        })
        .filter(m => m.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);

    res.json(matches);
});



const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Advanced Server: http://localhost:${PORT}`));