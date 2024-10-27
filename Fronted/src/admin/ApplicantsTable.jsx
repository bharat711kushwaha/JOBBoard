import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    // Log applicants to ensure we're getting the right structure
    console.log("Applicants Data:", applicants);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/application-status/${id}`, { status });

            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error("Status update failed. Please try again.");
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong. Try again later.';
            toast.error(message);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.length > 0 ? (
                            applicants.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullname || 'N/A'}</TableCell>
                                    <TableCell>{item?.applicant?.email || 'N/A'}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
                                    <TableCell>
                                        {
                                            item.applicant?.profile?.resume ? (
                                                <a className="text-blue-600 underline cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                                    {item?.applicant?.profile?.resumeOriginalName || 'Resume'}
                                                </a>
                                            ) : <span>N/A</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.createdAt?.split("T")[0] || 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="cursor-pointer hover:text-gray-600" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40">
                                                {
                                                    shortlistingStatus.map((status, index) => (
                                                        <div key={index} onClick={() => statusHandler(status, item?._id)} className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100">
                                                            <span>{status}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    No applicants found.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
