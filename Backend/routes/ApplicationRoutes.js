import express from 'express';
import {
    applyJob,
    getApplications,
    getApplicationsAdmin,
    updateStatus
} from '../controllers/ApplicationControllers.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

// Route to apply for a job (protected route)
router.get('/apply/:id', authMiddleware, applyJob);

// Route to get the logged-in user's applications (protected route)
router.get('/my-applications', authMiddleware, getApplications);

// Admin route to get all applications for a job (protected route)
router.get('/admin/applications/:id', authMiddleware, getApplicationsAdmin);

// Route to update the application status (protected route, likely for admin or employer)
router.post('/application-status/:id', authMiddleware, updateStatus);

export default router;
