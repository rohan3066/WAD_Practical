const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Book Schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);

// Initialize sample books
app.get('/api/init-books', async (req, res) => {
    const sampleBooks = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, genre: 'Fiction' },
        { title: '1984', author: 'George Orwell', price: 9.99, genre: 'Dystopian' },
        { title: 'Pride and Prejudice', author: 'Jane Austen', price: 7.99, genre: 'Romance' }
    ];
    try {
        await Book.deleteMany({});
        await Book.insertMany(sampleBooks);
        res.json({ message: 'Sample books initialized successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new book
app.post('/api/books', async (req, res) => {
    try {
        const { title, author, price, genre } = req.body;
        if (!title || !author || !price || !genre) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const book = new Book({ title, author, price, genre });
        await book.save();
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve a list of all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update book details
app.put('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, price, genre } = req.body;
        const updateData = { title, author, price, genre };
        // Remove undefined fields to prevent overwriting with undefined
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const book = await Book.findByIdAndUpdate(id, updateData, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully', book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});