import User from '../models/userSchema.js';  
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  
import mongoose from 'mongoose';  
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullname, email, phoneNumber, password: hashedPassword, role ,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({ message: "Account created successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with the current role", success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        }).status(200).json({ message: `Welcome back ${user.fullname}`, user, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later.", success: false, error: error.message });
    }
};

// Logout User
export const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ message: 'Logout successful', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Server error. Please try again later.', success: false, error: error.message });
    }
};

// Update User Profile
// Update User Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file; // This assumes you're handling file uploads with Multer
        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file); // Convert the file to Data URI
            try {
                // Upload the file to Cloudinary (ensure resource type is 'raw' for non-image files like PDFs)
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: 'raw', // 'raw' is used for non-image files like PDF
               
                });
            } catch (uploadError) {
                return res.status(500).json({ 
                    message: 'Cloudinary upload failed.', 
                    success: false, 
                    error: uploadError.message 
                });
            }
        }

        const userId = req.userId; // Middleware should set this from the JWT

        // Ensure user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Update user fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Initialize profile if it doesn't exist
        if (!user.profile) {
            user.profile = {};
        }

        // Update bio and skills in profile if provided
        if (bio) user.profile.bio = bio; // Update bio
        if (skills) user.profile.skills = skills.split(','); // Convert skills string to an array

        // Handle Cloudinary file upload response if a file was uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
            user.profile.resumeOriginalName = file.originalname; // Save the original file name
        }

        await user.save(); // Save changes to user document

        return res.status(200).json({ 
            message: "Profile updated successfully", 
            user, 
            success: true 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Server error. Please try again later.', 
            success: false, 
            error: error.message 
        });
    }
};
