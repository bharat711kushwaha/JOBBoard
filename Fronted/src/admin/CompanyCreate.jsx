import React, { useState } from 'react';
import { Label } from  '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State for company details
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    // Register a new company
    const registerNewCompany = async () => {
        try {
            // Check if all fields are filled
            if (!companyName || !location || !description) {
                return toast.error("Please fill all fields");
            }

            // Make API request to register company
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {
                CompanyName: companyName,
                location,
                description
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                // Dispatch the action to store company details in Redux
                dispatch(setSingleCompany(res.data.company));

                // Show success message
                toast.success(res.data.message);

                // Navigate to the newly created company's details page
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error creating company. Please try again.');
        }
    };

    return (
        <div className='max-w-4xl my-10 mx-auto px-6 py-8 bg-white shadow-lg rounded-lg animate-fadeIn'>
            <div className='mb-8'>
                <h1 className='font-extrabold text-3xl text-gray-800'>Create a New Company</h1>
                <p className='text-gray-500 mt-2'>Provide details for the company you'd like to create.</p>
            </div>

            {/* Company Name Input */}
            <div className='mb-6'>
                <Label className="text-lg text-gray-700">Company Name</Label>
                <Input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
                    placeholder="e.g. JobHunt, Microsoft"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            </div>

            {/* Location Input */}
            <div className='mb-6'>
                <Label className="text-lg text-gray-700">Location</Label>
                <Input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
                    placeholder="Location of the company"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            {/* Description Input */}
            <div className='mb-6'>
                <Label className="text-lg text-gray-700">Description</Label>
                <textarea
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300"
                    placeholder="Describe the company"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-between gap-4 mt-8'>
                <Button variant="outline" className="px-6 py-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 transition-all" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                <Button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-all" onClick={registerNewCompany}>Create Company</Button>
            </div>
        </div>
    );
};

export default CompanyCreate;
