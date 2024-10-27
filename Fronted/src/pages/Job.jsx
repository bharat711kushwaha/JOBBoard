import React from 'react';
import { Button } from '../components/ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({job}) => {
    const navigate = useNavigate();
   // const jobId= "fytcyghbmh";
   const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
}

    return (
        
        <motion.div 
            className="p-10 rounded-xl shadow-lg bg-gradient-to-r from-white via-[#f9f7ff] to-[#f5f3fe] border border-gray-200"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>

                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className="flex items-center gap-4 my-4">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-semibold text-xl text-[#7209b7]">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-600">'{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-xl my-3 text-[#F83002]">{job?.title}</h1>
                <p className="text-sm text-gray-600 leading-6">{job?.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
            <Badge className='text-blue-700 bg-blue-100 font-semibold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] bg-[#ffe2db] font-semibold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] bg-[#f3e0ff] font-semibold' variant="ghost">{job?.salary}LPA</Badge>
                <Badge className='text-[#FF5733] bg-[#FFD9CC] font-semibold' variant="ghost">{job?.experienceLevel}+ Years Experience</Badge>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <Button variant="outline" onClick={()=> navigate(`/description/${job?._id}`)}  className="hover:bg-gray-100">Details</Button>
                <Button className="bg-[#7209b7] text-white hover:bg-[#5e07a0]">Save For Later</Button>
            </div>
        </motion.div>
    );
};

export default Job;
