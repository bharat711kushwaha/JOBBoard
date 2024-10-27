import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// Table Row hover animation
const HoverRow = styled(TableRow)`
    &:hover {
        background-color: #f0f4f8;
        cursor: pointer;
        transition: background-color 0.2s ease-in;
    }
`;

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);


    console.log(allAppliedJobs);  // Debugging if data is being fetched

    return (
        <div>
            <Table className="table-auto w-full text-left">
                <TableCaption className="text-gray-500">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    You haven't applied to any job yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <HoverRow key={appliedJob._id}>
                                    <TableCell className="py-4">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob?.job?.title || 'N/A'}</TableCell>
                                    <TableCell>{appliedJob?.job?.company?.name || 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </HoverRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
