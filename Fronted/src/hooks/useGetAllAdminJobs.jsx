import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token) // Ensure token is retrieved
                const res = await axios.get(`${JOB_API_END_POINT}/admin/jobs`, {
                    
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        // Add the token to the request headers
                    },
                    withCredentials: true,
                });
                console.log(res.data.jobs);

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.error("Failed to fetch jobs:", res.data.message);
                }
            } catch (error) {
                console.error("Axios error:", error.response?.data || error.message);
            }
        };
        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
