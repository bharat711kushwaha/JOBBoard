import React, { useEffect } from 'react';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs(); // Fetch jobs on page load or search query change
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    // Reset the search query when leaving the page
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className='bg-gray-50 min-h-screen pt-24'>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl my-10'>
                    Search Results ({allJobs.length})
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        allJobs.length > 0 ? (
                            allJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                        ) : (
                            <div className='col-span-3 text-center text-gray-600'>
                                No jobs found.
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Browse;
