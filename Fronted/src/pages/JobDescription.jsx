import React, { useEffect, useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
//import useGetSingleJob from '@/hooks/useGetSingleJob';
import { setSingleJob } from '@/redux/jobSlice';

const JobDescription = () => {
     const {singleJob} = useSelector(store => store.job);
     const {user} = useSelector(store=>store.auth);
     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

     const params = useParams();
     const jobId = params.id;
   
     const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
              console.log(res.data)
            if(res.data.success){
                 setIsApplied(true); // Update the local state
                 const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                 dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);
   //const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                    <Badge className="text-blue-700 font-bold bg-blue-100">{singleJob?.position}</Badge>
                <Badge className="text-[#F83002] font-bold bg-[#FDE4E2]">{singleJob?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold bg-[#f4e0ff]">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>

            </div>

            <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>
  Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location || "Not specified"}</span>
</h1>

<h1 className='font-bold my-1'>
  Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description || "No description available"}</span>
</h1>

<h1 className='font-bold my-1'>
  Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel ? `${singleJob.experienceLevel} yrs` : "Not specified"}</span>
</h1>

<h1 className='font-bold my-1'>
  Requirement: 
  <span className='pl-4 flex flex-wrap gap-2 mt-2'>
    {singleJob?.requirement?.length > 0 ? (
      singleJob.requirement.map((skill, index) => (
        <Badge key={index} className='text-white bg-[#008CBA] px-3 py-1 rounded-md' variant="ghost">{skill}</Badge>
      ))
    ) : (
      <span className='font-normal text-gray-800'>No requirements specified</span>
    )}
  </span>
</h1>

<h1 className='font-bold my-1'>
  Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary ? `${singleJob.salary} LPA` : "Not specified"}</span>
</h1>

<h1 className='font-bold my-1'>
  Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || "No applicants yet"}</span>
</h1>

<h1 className='font-bold my-1'>
  Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0] || "Not available"}</span>
</h1>


            </div>
        </div>
    )
}

export default JobDescription