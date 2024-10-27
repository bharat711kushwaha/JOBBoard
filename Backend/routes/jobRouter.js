import express from 'express';
import { postJob, getAllJobs, getJobById, getAdminJobs } from '../controllers/jobController.js';
import authMiddleware from '../Middlewares/authMiddleware.js';  // Assuming middleware for authentication

const router = express.Router();

// Admin post a job
router.post('/create', authMiddleware, postJob);

// Get all jobs (for students)
router.get('/all', authMiddleware,getAllJobs);

// Get job by ID
router.get('/:id', authMiddleware,getJobById);

// Admin: Get jobs created by admin
router.get('/admin/jobs', authMiddleware, getAdminJobs);


export default router;
