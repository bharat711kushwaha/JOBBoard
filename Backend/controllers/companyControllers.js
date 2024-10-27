
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new company
import Company from "../models/companyModel.js";

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { CompanyName, location, description } = req.body;
        


        // Check if all required fields are provided
        if (!CompanyName || !location || !description) {
            return res.status(400).json({
                message: "Company name, location, and description are required",
                success: false
            });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: CompanyName });
        if (company) {
            return res.status(400).json({
                message: "You cannot register the same company twice",
                success: false
            });
        }

        // Create a new company
        company = await Company.create({
            name: CompanyName,
            location,
            description,
            userId:req.userId // Assuming `req.id` is the logged-in user's ID provided by middleware
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
};


// Get all companies for the logged-in user
export const getCompany = async (req, res) => {
    try {
        const userId = req.userId;; // Logged-in user's ID
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
};

// Get a specific company by its ID
export const getCompanyById = async (req, res) => {
    try {
        const { id: companyId } = req.params; // Extract company ID from params
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
};



// Update Company Information
export const updateCompany = async (req, res) => {
    try {
        const { CompanyName, description, location, website, industry } = req.body;
        const file = req.file; // To handle file upload in the future (e.g., cloudinary)
  //console.log( CompanyName, description, location, website, industry)
  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  const logo = cloudResponse.secure_url;
        // Preparing the update data object
        const updateData = {
            name: CompanyName,
            description,
            location,
            website,
            industry,
            logo  
        };

        // Find and update the company with new data
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // If the company doesn't exist
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        // Return success message
        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
};

// Delete Company
export const deleteCompany = async (req, res) => {
    try {
        // Find the company by ID and remove it
        const company = await Company.findByIdAndDelete(req.params.id);

        // If company not found
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        // Return success message
        return res.status(200).json({
            message: "Company deleted successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
};
