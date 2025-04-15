// const express = require("express")
// const cors = require("cors")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// // const bodyParser = require("body-parser")
// const app = express()
// const Routes = require("./routes/route.js")

// const PORT = process.env.PORT || 5000

// dotenv.config();

// // app.use(bodyParser.json({ limit: '10mb', extended: true }))
// // app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// app.use(express.json({ limit: '10mb' }))
// app.use(cors())

// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(console.log("Connected to MongoDB"))
//     .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

// app.use('/', Routes);

// app.listen(PORT, () => {
//     console.log(`Server started at port no. ${PORT}`)
// })


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables before anything else
dotenv.config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const Routes = require("./routes/route.js");

const PORT =  8000;
const MONGO_URI = process.env.MONGO_URI;

// Debugging: Check if MONGO_URL is being loaded
console.log("🔍 MONGO_URL:", MONGO_URI);

if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URL is undefined. Check your .env file.");
    process.exit(1); // Stop execution if MONGO_URL is missing
}

// Middleware
app.use(express.json({ limit: "10mb" }));
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
app.use("/app", Routes);
app.use('/api', userRoutes);


// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server started at port ${PORT}`);
});
