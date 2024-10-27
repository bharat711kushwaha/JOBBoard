import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
   
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Referencing the Job model (the job being applied for)
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','rejected'], // Application status
        default: 'pending'
    },
    feedback: {
        type: String, // Optional feedback from the recruiter about the application
        default: ""
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Export the Application model
const Application = mongoose.model('Application', ApplicationSchema);

export default Application;
