import React from 'react';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();

    return (
        <div 
            className='p-6 rounded-lg shadow-lg bg-white border border-gray-100 cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out hover:shadow-xl'
            onClick={()=> navigate(`/description/${job._id}`)} 
        >
            {/* Company and Location */}
            <div className='mb-4'>
                <h1 className='font-semibold text-xl text-gray-900'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-600'>{job?.location}</p>
            </div>

            {/* Job Title and Description */}
            <div className='mb-4'>
                <h1 className='font-bold text-2xl text-[#6A38C2] mb-1'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
                        {/* Required Skills */}
                        <div className='flex flex-wrap gap-2 mt-2'>
                {job?.requirement?.map((skill, index) => (
                    <Badge key={index} className='text-[#008CBA] bg-[#E0F7FA]' variant="ghost">{skill}</Badge>
                ))}
            </div>


            {/* Badges for Job Details */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 bg-blue-100 font-semibold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] bg-[#ffe2db] font-semibold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] bg-[#f3e0ff] font-semibold' variant="ghost">{job?.salary}LPA</Badge>
                <Badge className='text-[#FF5733] bg-[#FFD9CC] font-semibold' variant="ghost">{job?.experienceLevel}+ Years Experience</Badge>

            </div>
            <p className='text-sm text-gray-500 mt-2'>
    Posted on: {new Date(job?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}
</p>


        </div>
    );
};

export default LatestJobCards;
