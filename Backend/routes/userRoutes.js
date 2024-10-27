import express from 'express';  // Import Express
import { registerUser, login, logoutUser, updateProfile } from '../controllers/userControllers.js';  // Import controllers
import authMiddleware from '../Middlewares/authMiddleware.js';  // Import authentication middleware (if any)
import { singleUpload } from '../Middlewares/multer.js';
const router = express.Router();  // Initialize the router

// Register route
router.post('/register',singleUpload ,registerUser);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logoutUser);

// Profile update route (with authentication middleware)
router.post('/profile', authMiddleware, singleUpload, updateProfile);


export default router;
