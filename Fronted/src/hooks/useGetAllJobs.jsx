import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                let res;

                // If there is a search query, filter jobs by keyword
                if (searchedQuery.trim()) {
                    res = await axios.get(`${JOB_API_END_POINT}/all?keyword=${searchedQuery}`, { withCredentials: true });
                } else {
                    // Fetch all jobs if there's no search query
                    res = await axios.get(`${JOB_API_END_POINT}/all`, { withCredentials: true });
                }

                if (res.data.success) {
                    // Set the jobs in the redux store
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    // If no jobs are found, reset the job list
                    dispatch(setAllJobs([]));
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
                dispatch(setAllJobs([])); // Reset jobs in case of error
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
