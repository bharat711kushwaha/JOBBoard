import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white mt-5">
            <Table>
                <TableCaption className="text-lg font-semibold">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company, index) => (
                            <TableRow key={index} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} className="rounded-full shadow-md" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-gray-800">{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-500 hover:text-gray-700 transition duration-300" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white shadow-md rounded-lg">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all duration-200 cursor-pointer rounded-lg"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
