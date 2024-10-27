import React from 'react';
import { Label } from '../components/ui/label.jsx';
import { Input } from '../components/ui/input.jsx';
import { RadioGroup } from '../components/ui/radio-group';
import { Button } from '@/components/ui/button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'
import  { useEffect, useState } from 'react'
import axios from 'axios';
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

import { USER_API_END_POINT } from '@/utils/constant'
import { useSelector , useDispatch} from 'react-redux';
function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
});
const {loading,user} = useSelector(store =>store.auth);
const  navigate= useNavigate();
const dispatch = useDispatch();
const changeEventHandler = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
}
const changeFileHandler = (e) => {
  setInput({ ...input, file: e.target.files?.[0] });
}
const submitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData();    //form data object
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("password", input.password);
  formData.append("role", input.role);
  console.log(input)
  if (input.file) {
      formData.append("file", input.file);
  }
 try{
  dispatch(setLoading(true));
  const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
    headers: { 'Content-Type': "multipart/form-data" },
    withCredentials: true,
});
if (res.data.success) {
  navigate("/login");
  toast.success(res.data.message);
}
 }catch(error){
    console.log(error);
    toast.error(error.response.data.message);
 }
 finally {
  dispatch(setLoading(false));
}
  
}
useEffect(()=>{
  if(user){
    navigate("/");
  }
})
  return (
    <div className="flex items-center justify-between h-screen bg-white">
      {/* Left section - Image */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-[#f7f7f7]">
        <img
          src="/signup-image.jpg" // Change the image to a job-portal-related one
          alt="Signup Visual"
          className="max-w-full max-h-[80%] object-cover rounded-lg"
        />
      </div>

      {/* Right section - Signup Form */}
      <div className="flex flex-col items-center justify-center md:w-1/2 px-6 md:px-12">
        <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-lg bg-white'>
          <h1 className='text-3xl font-bold mb-6 text-center text-[#6A38C2]'>Sign Up</h1>

          <div className='mb-4'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value= {input.fullname}
              name="fullname"
              placeholder="Bharat"
              onChange={changeEventHandler}
              className="w-full"
            />
          </div>

          <div className='mb-4'>
            <Label>Email</Label>
            <Input
              type="email"
              value= {input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="bharat@gmail.com"
              className="w-full"
            />
          </div>

          <div className='mb-4'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value= {input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8986098572"
              className="w-full"
            />
          </div>

          <div className='mb-4'>
            <Label>Password</Label>
            <Input
              type="password"
              value= {input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="w-full"
            />
          </div>

          {/* Radio buttons for role */}
          <div className='mb-6'>
            <Label>Role</Label>
            <RadioGroup className="flex items-center gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === 'student'}
                    onChange={changeEventHandler}
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile picture input */}
          <div className='mb-6'>
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="w-full cursor-pointer"
            />
          </div>

          {/* Signup button */}
          {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">signup</Button>
                    }

          <span className='block text-center mt-4 text-sm'>
            Already have an account? <Link to="/login" className='text-[#F83002] hover:underline'>Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
