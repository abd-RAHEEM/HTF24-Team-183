const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());

// Serve static files from the project root
app.use(express.static(path.join(__dirname))); // Serve all files from the root directory

let users = []; // Temporarily store users

// Registration route
app.post('/register', (req, res) => {
    const { username, password, country, sport } = req.body;

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send({ message: "Username already exists." });
    }

    // Add user to the users array
    users.push({ username, password, country, sport });
    res.send({ message: "Registration successful!" });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.send({ message: "Login successful!" });
    } else {
        res.status(401).send({ message: "Invalid username or password." });
    }
});

// Serve HTML files for the main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
