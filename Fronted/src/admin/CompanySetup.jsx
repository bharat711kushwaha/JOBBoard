import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft, Loader2, UploadCloud } from 'lucide-react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/get/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={() => navigate('/admin/companies')}
          variant="outline"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <h1 className="text-3xl font-semibold text-gray-800">Company Setup</h1>
      </div>

      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Company Name */}
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
              className="rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter company description"
              className="rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Website */}
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Enter company website"
              className="rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter company location"
              className="rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* File Upload */}
          <div className="sm:col-span-2">
            <Label>Upload Company Logo</Label>
            <div className="relative flex items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <UploadCloud className="w-6 h-6 text-gray-500" />
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-sm text-gray-500 ml-2">Upload logo</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          {loading ? (
            <Button className="w-full bg-indigo-600 text-white flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Update Company
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanySetup;
