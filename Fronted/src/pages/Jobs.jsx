import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FilterCard from './FilterCard.jsx';
import Job from './Job';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex gap-5">
                {/* Adjusted the width of FilterCard to take appropriate space */}
                <div className="w-1/4 py-10">
                    <FilterCard />
                </div>
                <div className="w-3/4">
                    {
                        filterJobs.length <= 0 ? (
                            <span>Job not found</span>
                        ) : (
                            <div className="h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;
