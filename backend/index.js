

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

// Load environment variables before anything else
dotenv.config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const Routes = require("./routes/route.js");

const PORT =  7777;
const MONGO_URI = process.env.MONGO_URI;

// Debugging: Check if MONGO_URL is being loaded

if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URL is undefined. Check your .env file.");     
    process.exit(1); // Stop execution if MONGO_URL is missing
}

app.use('/invoices', express.static(path.join(__dirname, 'invoices')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Stop execution on database connection failure
    });



// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  
app.use("/", Routes);
app.use('/', userRoutes);


// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server started at port ${PORT}`);
});

