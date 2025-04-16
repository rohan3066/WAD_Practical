const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/music', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define Song Schema
const songSchema = new mongoose.Schema({
  songName: String,
  filmName: String,
  musicDirector: String,
  singer: String,
  actor: String,
  actress: String
});

const Song = mongoose.model('Song', songSchema);

// Middleware to parse JSON
app.use(express.json());

// a) Create a database called music (handled by mongoose.connect)

// b) Create a collection called songdetails
// c) Insert array of 5 song documents
app.post('/init', async (req, res) => {
  const songs = [
    { songName: 'ABC', filmName: 'DEF', musicDirector: 'GHI', singer: 'JKL' },
    { songName: 'XYZ', filmName: 'UVW', musicDirector: 'RST', singer: 'OPQ' },
    { songName: 'MNO', filmName: 'PQR', musicDirector: 'STU', singer: 'VWX' },
    { songName: 'EFG', filmName: 'HIJ', musicDirector: 'KLM', singer: 'NOP' },
    { songName: 'STU', filmName: 'VWX', musicDirector: 'YZA', singer: 'BCD' }
  ];

  await Song.insertMany(songs);
  res.send('Songs inserted');
});

// d) Display total count and list all documents
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  res.json({ total: songs.length, songs });
});

// e) List specified Music Director songs
app.get('/songs/music-director/:director', async (req, res) => {
  const songs = await Song.find({ musicDirector: req.params.director });
  res.json(songs);
});

// f) List specified Music Director songs sung by specified Singer
app.get('/songs/music-director/:director/singer/:singer', async (req, res) => {
  const songs = await Song.find({ musicDirector: req.params.director, singer: req.params.singer });
  res.json(songs);
});

// g) Delete the song which you don't like
app.delete('/songs/:songName', async (req, res) => {
  await Song.deleteOne({ songName: req.params.songName });
  res.send('Song deleted');
});

// h) Add new song which is your favourite
app.post('/songs', async (req, res) => {
  const newSong = new Song(req.body);
  await newSong.save();
  res.send('New song added');
});

// i) List Songs sung by Specified Singer from Specified Film
app.get('/songs/singer/:singer/film/:film', async (req, res) => {
  const songs = await Song.find({ singer: req.params.singer, filmName: req.params.film });
  res.json(songs);
});

// j) Update the document by adding Actor and Actress name
app.put('/songs/:songName', async (req, res) => {
  const { actor, actress } = req.body;
  await Song.updateOne({ songName: req.params.songName }, { $set: { actor, actress } });
  res.send('Song updated');
});

// k) Display the above data in Browser in tabular format
app.get('/songs/table', async (req, res) => {
  const songs = await Song.find();
  let html = `
    <table border="1">
      <tr>
        <th>Song Name</th>
        <th>Film Name</th>
        <th>Music Director</th>
        <th>Singer</th>
        <th>Actor</th>
        <th>Actress</th>
      </tr>
  `;
  songs.forEach(song => {
    html += `
      <tr>
        <td>${song.songName || ''}</td>
        <td>${song.filmName || ''}</td>
        <td>${song.musicDirector || ''}</td>
        <td>${song.singer || ''}</td>
        <td>${song.actor || ''}</td>
        <td>${song.actress || ''}</td>
      </tr>
    `;
  });
  html += '</table>';
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// Questions and Answers
// Q: What is the purpose of using Node.js in this project?
// A: Node.js is used as the runtime environment to execute JavaScript code server-side. It allows asynchronous, non-blocking operations, making it efficient for handling HTTP requests and interacting with the MongoDB database in this music management application.
// Q: Why did you choose Express.js over other frameworks?
// A: Express.js is chosen for its simplicity and flexibility in building web applications and APIs. It provides a robust set of features for routing, middleware, and handling HTTP requests, which are essential for creating the RESTful endpoints in this project.
// Q: What is MongoDB, and how does it fit into this project?
// A: MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON. In this project, it is used to store song details in the songdetails collection, allowing for easy insertion, retrieval, and updating of documents based on various criteria.
// Q: Explain the role of the mongoose.connect function in the code.
// A: The mongoose.connect function establishes a connection to the MongoDB database. In this case, it connects to a local database named music. It uses options like useNewUrlParser and useUnifiedTopology to ensure compatibility and proper connection handling.
// Q: What is a Mongoose Schema, and why is it used here?
// A: A Mongoose Schema defines the structure of documents within a collection. In this project, the songSchema specifies fields like songName, filmName, musicDirector, singer, actor, and actress, ensuring data consistency and enabling easy querying and validation.
// Q: How does the /init endpoint work?
// A: The /init endpoint uses Song.insertMany to insert an array of five song documents into the songdetails collection. It sends a success message once the insertion is complete, initializing the database with sample data.
// Q: What does the /songs endpoint do?
// A: The /songs endpoint retrieves all documents from the songdetails collection using Song.find() and returns the total count along with the list of songs in JSON format, making it useful for displaying all songs.
// Q: How would you filter songs by a specific music director?
// A: You can use the /songs/music-director/:director endpoint, where :director is a parameter. The endpoint uses Song.find({ musicDirector: req.params.director }) to retrieve and return all songs associated with the specified music director.
// Q: Explain the process of deleting a song in this application.
// A: The /songs/:songName endpoint with the DELETE method uses Song.deleteOne({ songName: req.params.songName }) to remove a song document matching the provided song name, confirming the deletion with a response message.
// Q: How is the tabular display of data implemented?
// A: The /songs/table endpoint fetches all songs using Song.find(), then constructs an HTML table dynamically with headers (Song Name, Film Name, etc.) and rows populated from the song data, which is sent as a response to be rendered in the browser.
// Q: What is the purpose of the app.use(express.json()) middleware?
// A: The app.use(express.json()) middleware parses incoming requests with JSON payloads, enabling the server to handle data sent in the request body (e.g., for POST and PUT requests) and making it available in req.body.
// Q: How would you handle errors in this code?
// A: Error handling can be added using try-catch blocks around asynchronous operations (e.g., await Song.find()). For example, in the /songs endpoint, you could wrap the find call in a try-catch and send an error response like res.status(500).json({ error: err.message }) if an error occurs.
// Q: What is the significance of the actor and actress fields added via the UPDATE operation?
// A: The actor and actress fields are added to enhance the song documents with additional metadata, allowing for more detailed queries and displays (e.g., in the tabular format). The PUT /songs/:songName endpoint updates these fields using the $set operator in Mongoose.
// Q: Can you explain how to test this application?
// A: You can test the application using tools like Postman or curl. For example, send a GET request to http://localhost:3000/songs to list all songs, a POST request to http://localhost:3000/init to initialize data, or a PUT request to http://localhost:3000/songs/ABC with a JSON body to update a song.
// Q: What improvements would you suggest for this code?
// A: Improvements could include adding input validation (e.g., using Joi or Mongoose validators), implementing authentication for secure access, adding error handling for all endpoints, and creating a front-end interface (e.g., with EJS or React) for a better user experience.