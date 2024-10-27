import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import CompaniesTable from './CompaniesTable';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="max-w-6xl mx-auto my-10 py-10 px-4 bg-gradient-to-br from-gray-100 via-white to-gray-50 shadow-xl rounded-lg animate-fade-in">
            <div className="flex items-center justify-between my-5 space-y-3 md:space-y-0 flex-col md:flex-row">
                <Input
                    className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 shadow-md"
                    placeholder="Filter by name"
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button 
                    className="mt-5 md:mt-0 px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300"
                    onClick={() => navigate('/admin/companies/create')}
                >
                    New Company
                </Button>
            </div>
            <CompaniesTable />
        </div>
    );
};

export default Companies;
