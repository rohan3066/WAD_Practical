const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Student Schema
const studentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Roll_No: { type: Number, required: true, unique: true },
    WAD_Marks: { type: Number, required: true },
    CC_Marks: { type: Number, required: true },
    DSBDA_Marks: { type: Number, required: true },
    CNS_Marks: { type: Number, required: true },
    AI_Marks: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema, 'studentmarks');

// a & b: Database 'student' and collection 'studentmarks' are created implicitly

// c: Insert student documents
app.get('/api/insert-students', async (req, res) => {
    const students = [
        { Name: 'John Doe', Roll_No: 101, WAD_Marks: 25, CC_Marks: 30, DSBDA_Marks: 22, CNS_Marks: 28, AI_Marks: 27 },
        { Name: 'Jane Smith', Roll_No: 102, WAD_Marks: 30, CC_Marks: 35, DSBDA_Marks: 25, CNS_Marks: 32, AI_Marks: 29 },
        { Name: 'Alice Brown', Roll_No: 103, WAD_Marks: 20, CC_Marks: 28, DSBDA_Marks: 18, CNS_Marks: 26, AI_Marks: 24 },
        { Name: 'Bob Wilson', Roll_No: 104, WAD_Marks: 35, CC_Marks: 40, DSBDA_Marks: 30, CNS_Marks: 38, AI_Marks: 36 },
        { Name: 'Emma Davis', Roll_No: 105, WAD_Marks: 15, CC_Marks: 20, DSBDA_Marks: 17, CNS_Marks: 22, AI_Marks: 19 }
    ];

    try {
        await Student.deleteMany({}); // Clear existing data
        await Student.insertMany(students);
        res.json({ message: '5 students inserted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// d: Display total count and list all documents
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        const count = await Student.countDocuments();
        res.json({ count, students });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// e: List students with DSBDA_Marks > 20
app.get('/api/students/dsbda-above-20', async (req, res) => {
    try {
        const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// f: Update marks of a specified student by 10
app.put('/api/students/update-marks/:rollNo', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { Roll_No: req.params.rollNo },
            {
                $inc: {
                    WAD_Marks: 10,
                    CC_Marks: 10,
                    DSBDA_Marks: 10,
                    CNS_Marks: 10,
                    AI_Marks: 10
                }
            },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Marks updated successfully', student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// g: List students with more than 25 marks in all subjects
app.get('/api/students/all-above-25', async (req, res) => {
    try {
        const students = await Student.find({
            WAD_Marks: { $gt: 25 },
            CC_Marks: { $gt: 25 },
            DSBDA_Marks: { $gt: 25 },
            CNS_Marks: { $gt: 25 },
            AI_Marks: { $gt: 25 }
        }, 'Name');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// h: List students with less than 40 in both WAD and CC (assuming WAD as Maths and CC as Science)
app.get('/api/students/low-wad-cc', async (req, res) => {
    try {
        const students = await Student.find({
            WAD_Marks: { $lt: 40 },
            CC_Marks: { $lt: 40 }
        }, 'Name');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// i: Remove a specified student
app.delete('/api/students/:rollNo', async (req, res) => {
    try {
        const result = await Student.deleteOne({ Roll_No: req.params.rollNo });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// j: Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});