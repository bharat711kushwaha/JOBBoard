import Application from "../models/ApplicationModel.js";
import Job from "../models/jobModel.js"; // Assuming you have a Job model imported
import mongoose from "mongoose";

// Apply for a Job
export const applyJob = async (req, res) => {
    try {
        const userId = req.userId;
      // Assuming you have user authentication middleware
        const jobId = req.params.id;

        // Check if the jobId is valid and exists
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID",
                success: false
            });
        }

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }


        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Add application to the job's application list
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
            application: newApplication
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Get Applications for a User

export const getApplications = async (req, res) => {
    try {
        const userId = req.userId;

        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });

        if (!applications.length) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// Admin View: Get All Applications for a Job
export const getApplicationsAdmin = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID",
                success: false
            });
        }

        // Populate the 'applications' array, not a singular 'application'
        const job = await Job.findById(jobId)
            .populate({
                path: 'applications', 
                options:{sort:{createdAt:-1}}, // updated to 'applications' array
                populate: {
                    path: 'applicant', // referencing 'User' model for applicants
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            applications: job.applications, // returning the populated applications
            success: true
        });
    } catch (error) {
        console.error("Error fetching job applications:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Update Application Status (Admin or Company)
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const validStatuses = ['pending', 'accepted', 'rejected'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid status. Must be 'pending', 'accepted', or 'rejected'",
                success: false
            });
        }

        // Check if the applicationId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({
                message: "Invalid application ID",
                success: false
            });
        }

        // Find the application by its ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            updatedApplication: application
        });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
