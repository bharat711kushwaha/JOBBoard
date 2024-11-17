import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from './routes/userRoutes.js';  // Import user routes

import companyRoutes from "./routes/companyRouter.js"; // Importing company routes
import jobRoutes from "./routes/jobRouter.js"; // Importing company routes
import ApplicationRoutes from "./routes/ApplicationRoutes.js";

import path from "path";

const app = express();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true                
};
app.use(cors(corsOptions));

// Route
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});

app.use('/api/v1/users', userRoutes);  // Prefix for user-related routes
app.use('/api/v1/company', companyRoutes); 
app.use('/api/v1/job', jobRoutes); 
app.use('/api/v1/Application', ApplicationRoutes); 

app.use(express.static(path.join(_dirname, "/Fronted/dist")));
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname, "Fronted","dist","index.html"));
})
// Start the server
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
