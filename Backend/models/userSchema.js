import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, // Changed to String to handle phone number formats like '+1-234-567-890'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true
    },
    profile: {
        bio: {
            type: String,
            default: "" // Default empty bio to avoid undefined issues
        },
        skills: [{
            type: String
        }],
        resume: {
            type: String // Assuming this will hold the URL to the uploaded resume
        },
        resumeFileName: { // Renamed for clarity
            type: String,
            
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company' // Reference to the Company model
        },
        profilePhoto: {
            type: String,
            default: "" // Default empty string to avoid issues
        }
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Export the User model
const User = mongoose.model('User', UserSchema);

export default User;
