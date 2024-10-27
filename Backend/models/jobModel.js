import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirement: [{ type: String }],  // Array of strings
  location: { type: String, required: true },
  salary: { type: Number, required: true },  // Salary as Number
  experienceLevel: { type: Number, required: true },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Internship"],  // Limiting to specific values
    required: true
  },
  position: { type: Number, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencing User model
    required: true
  },
  applications: [{  // This should be an array of ObjectIds referencing applications
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'  // Referencing Application model
  }],
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
