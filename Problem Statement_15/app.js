const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get product data
app.get('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile('products.json', 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        console.error('Error reading products.json:', error);
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