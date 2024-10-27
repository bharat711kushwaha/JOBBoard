// controllers/jobController.js
import Job from "../models/jobModel.js";

// Admin can post a job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.userId; // Ensure you access the user ID correctly

        // Validate required fields
        if (!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        }

        // Validate requirement is an array of strings
        // if (!Array.isArray(requirement) || requirement.some(req => typeof req !== 'string')) {
        //     return res.status(400).json({
        //         message: "Requirement must be an array of strings",
        //         success: false
        //     });
        // }

        // Create a new job
        const newJob = await Job.create({
            title,
            description,
            requirement,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company:companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job: newJob,
            success: true
        });
    } catch (error) {
        console.error("Error creating job:", error); // More informative logging
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message // Send the error message for debugging
        });
    }
};

// For students: Get all jobs with optional keyword search
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createAt:-1});

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching jobs:", error); // More informative logging
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Get job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const foundJob = await Job.findById(jobId).populate({
            path:"applications"
        }); // Use a different name

        if (!foundJob) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job: foundJob,
            success: true
        });
    } catch (error) {
        console.error("Error fetching job:", error); // More informative logging
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message // Send the error message for debugging
        });
    }
};

// Admin: Get all jobs created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.userId; // Assuming `req.userId` contains the authenticated admin user ID
 // console.log(adminId);
        // Ensure adminId is present
        if (!adminId) {
            return res.status(400).json({
                message: "Admin ID is required",
                success: false
            });
        }

        // Fetch jobs created by this admin, sorted by creation date in descending order
        const jobs = await Job.find({created_by: adminId })
            .populate('company')  // Populating the related company information
            .sort({ createdAt: -1 }); // Sorting by creation date (newest first)

        // If no jobs are found, return a 404 response
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        // Return the jobs in the response
        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Error fetching admin jobs:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
