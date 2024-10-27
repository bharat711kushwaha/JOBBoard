import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApplicantsTable from './ApplicantsTable';
import { toast } from 'sonner';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    console.log(applicants);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/admin/applications/${params.id}`, { withCredentials: true });
                
                // Log the API response to inspect its structure
                console.log("API Response:", res.data);
                
                if (res.data.success) {
                    // Adjust this based on the actual structure of the API response
                    dispatch(setAllApplicants(res.data?.applications || []));
                } else {
                    toast.error('Failed to fetch applicants');
                }
            } catch (error) {
                console.log("Error:", error);
                toast.error(error.response?.data?.message || error.message || 'Something went wrong. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllApplicants();
    }, [params.id, dispatch]);
    
    return (
        <div>
            <div className='max-w-7xl py-10 pt-15 mx-auto'>
                <h1 className='font-bold text-xl my-5'>
                    Applicants ({applicants?.length || 0}) {/* Adjusted to applicants.length */}
                </h1>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : applicants?.length > 0 ? (
                    <ApplicantsTable />
                ) : (
                    <div>No applicants found.</div>
                )}
            </div>
        </div>
    );
};

export default Applicants;
