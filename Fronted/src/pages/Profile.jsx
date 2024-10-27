import React, { useState } from 'react';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '@/hooks/useGetAppliedJob';

// Animation and modern style
const FadeInDiv = styled.div`
    animation: fadeIn 0.5s ease-in-out;
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const { user } = useSelector(store => store.auth);
  
    const [open, setOpen] = useState(false);

    return (
        <FadeInDiv className='max-w-7xl mx-auto p-5'>
            {/* Profile Card */}
            <div className='bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 shadow-lg transition-transform duration-300 hover:scale-105">
                            <AvatarImage src="/job.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-900'>{user?.fullname}</h1>
                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen /> Edit
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-gray-700'>
                        <Mail className="text-blue-500" />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-gray-700'>
                        <Contact className="text-blue-500" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className='my-5'>
                    <h2 className='font-semibold text-lg text-gray-900 mb-2'>Skills</h2>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                             user?.profile?.skills.length !== 0 
                             ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md">{item}</Badge>
                            )) 
                             : <span>NA</span>
                        }
                    </div>
                </div>

                {/* Resume Section */}
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume && (
                            user?.profile?.resume ? (
                                <a
                                    href={user.profile.resume }  // Corrected
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-500 w-full hover:underline cursor-pointer'
                                >
                                    {user.profile.resumeOriginalName || 'Download Resume'}
                                </a>
                            ) : (
                                <p>No resume available</p>
                            )
                        )
                        // isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className='bg-white border border-gray-200 rounded-xl shadow-lg my-5 p-8'>
                <h1 className='font-bold text-lg mb-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </FadeInDiv>
    );
};

export default Profile;
