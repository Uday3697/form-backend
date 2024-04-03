const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require ('dotenv').config()

const cors=require('cors')

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// kindlu use your env or mongo connection string here directly 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Define Schema and Model for Form Data
const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    city:String,
    phone:String
});
const FormData = mongoose.model('FormData', formDataSchema);

// Routes
app.post('/submit-form', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving form data' });
    }
});
// Route to get all stored form data
app.get('/', async (req, res) => {
    try {
        const allFormData = await FormData.find();
        res.status(200).json(allFormData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching form data' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
