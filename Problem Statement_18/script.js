const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Song Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('Song', songSchema, 'songdetails');

// a & b: Database 'music' and collection 'songdetails' are created implicitly by MongoDB

// c: Insert 5 song documents
app.get('/api/insert-songs', async (req, res) => {
    const songs = [
        { Songname: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', Singer: 'Arijit Singh' },
        { Songname: 'Gerua', Film: 'Dilwale', Music_director: 'Pritam', Singer: 'Arijit Singh' },
        { Songname: 'Channa Mereya', Film: 'Ae Dil Hai Mushkil', Music_director: 'Pritam', Singer: 'Arijit Singh' },
        { Songname: 'Zaalima', Film: 'Raees', Music_director: 'JAM8', Singer: 'Arijit Singh' },
        { Songname: 'Tere Sang Yaara', Film: 'Rustom', Music_director: 'Arko', Singer: 'Atif Aslam' }
    ];

    try {
        await Song.deleteMany({}); // Clear existing data
        await Song.insertMany(songs);
        res.json({ message: '5 songs inserted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// d: Display total count and list all documents
app.get('/api/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        const count = await Song.countDocuments();
        res.json({ count, songs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// e: List songs by specified Music Director
app.get('/api/songs/music-director/:musicDirector', async (req, res) => {
    try {
        const songs = await Song.find({ Music_director: req.params.musicDirector });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// f: List songs by Music Director and Singer
app.get('/api/songs/music-director/:musicDirector/singer/:singer', async (req, res) => {
    try {
        const songs = await Song.find({
            Music_director: req.params.musicDirector,
            Singer: req.params.singer
        });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// g: Delete a song
app.delete('/api/songs/:songname', async (req, res) => {
    try {
        const result = await Song.deleteOne({ Songname: req.params.songname });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// h: Add a new song
app.post('/api/songs', async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.json({ message: 'Song added successfully', song });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// i: List songs by Singer and Film
app.get('/api/songs/singer/:singer/film/:film', async (req, res) => {
    try {
        const songs = await Song.find({
            Singer: req.params.singer,
            Film: req.params.film
        });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// j: Update songs by adding Actor and Actress
app.put('/api/songs/update-actors', async (req, res) => {
    try {
        const updates = [
            { Songname: 'Tum Hi Ho', Actor: 'Aditya Roy Kapur', Actress: 'Shraddha Kapoor' },
            { Songname: 'Gerua', Actor: 'Shah Rukh Khan', Actress: 'Kajol' },
            { Songname: 'Channa Mereya', Actor: 'Ranbir Kapoor', Actress: 'Anushka Sharma' },
            { Songname: 'Zaalima', Actor: 'Shah Rukh Khan', Actress: 'Mahira Khan' },
            { Songname: 'Tere Sang Yaara', Actor: 'Akshay Kumar', Actress: 'Ileana D\'Cruz' }
        ];

        for (const update of updates) {
            await Song.updateOne(
                { Songname: update.Songname },
                { $set: { Actor: update.Actor, Actress: update.Actress } }
            );
        }
        res.json({ message: 'Songs updated with Actor and Actress' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// k: Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});