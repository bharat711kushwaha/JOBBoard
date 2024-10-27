import mongoose from "mongoose";


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String, 
        default: ""
    },
    industry: {
        type: String,
       
    },
    logo: {
        type: String, // URL for the company's logo image
        default: ""
    },
   
   userId :{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required : true
   }
},

{
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Export the Company model
const Company = mongoose.model('Company', CompanySchema);

export default Company;
