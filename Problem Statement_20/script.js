const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true },
    joiningDate: { type: Date, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Add a new employee
app.post('/api/employees', async (req, res) => {
    try {
        const { name, department, designation, salary, joiningDate } = req.body;
        if (!name || !department || !designation || !salary || !joiningDate) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const employee = new Employee({
            name,
            department,
            designation,
            salary,
            joiningDate: new Date(joiningDate)
        });
        await employee.save();
        res.status(201).json({ message: 'Employee added successfully', employee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all employee records
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing employee’s details
app.put('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department, designation, salary, joiningDate } = req.body;
        const updateData = {
            name,
            department,
            designation,
            salary,
            joiningDate: joiningDate ? new Date(joiningDate) : undefined
        };
        // Remove undefined fields to prevent overwriting with undefined
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
        
        const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully', employee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an employee record
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});