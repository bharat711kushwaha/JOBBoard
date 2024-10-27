import express from "express";
import { registerCompany, getCompany, getCompanyById, updateCompany, deleteCompany } from "../controllers/companyControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js"; // Assuming you have an auth middleware for user authentication
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

// Register a new company
router.post("/register", authMiddleware, registerCompany);

// Get all companies for the logged-in user
router.get("/get", authMiddleware, getCompany);

// Routes for specific company by ID
router
  .route("/get/:id")
  .get(authMiddleware, getCompanyById)    // Get company by ID
  .put(authMiddleware, singleUpload,updateCompany)     // Update company by ID
  .delete(authMiddleware, deleteCompany); // Delete company by ID

export default router;

