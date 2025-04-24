const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get user data
app.get('/api/users', async (req, res) => {
    try {
        const data = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(data);
        res.json(users);
    } catch (error) {
        console.error('Error reading users.json:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the front-end page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
