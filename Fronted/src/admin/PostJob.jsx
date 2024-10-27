import React, { useState } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirement: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = value => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/create`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={submitHandler} className="p-8 max-w-4xl w-full bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label>Requirements</Label>
                        <Input
                            type="text"
                            name="requirement"
                            value={input.requirement}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input
                            type="text"
                            name="salary"
                            value={input.salary}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <Label>Job Type</Label>
                        <Select onValueChange={(value) => setInput({ ...input, jobType: value })}>
                            <SelectTrigger className="w-full mt-2 rounded-md bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                                <SelectValue placeholder="Select Job Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-md shadow-md">
                                <SelectGroup>
                                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input
                            type="text"
                            name="experience"
                            value={input.experience}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label>No. of Positions</Label>
                        <Input
                            type="number"
                            name="position"
                            value={input.position}
                            onChange={changeEventHandler}
                            className="mt-2 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {companies.length > 0 && (
                        <div className="col-span-1 md:col-span-2">
                            <Label>Company</Label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full mt-2 rounded-md bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-md shadow-md">
                                    <SelectGroup>
                                        {companies.map(company => (
                                            <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
                {loading ? (
                    <Button disabled className="mt-6 w-full flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Posting...
                    </Button>
                ) : (
                    <Button type="submit" className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                        Post New Job
                    </Button>
                )}
                {companies.length === 0 && (
                    <p className="text-sm text-red-500 font-bold text-center mt-4">
                        *Please register a company first before posting jobs.
                    </p>
                )}
            </form>
        </div>
    );
};

export default PostJob;
