import React from 'react'
import { Label } from '../components/ui/label.jsx';
import { Input } from '../components/ui/input.jsx';
import { RadioGroup } from  '../components/ui/radio-group'
import { Button } from '@/components/ui/button.jsx';
import { Link ,useNavigate} from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import  { useEffect, useState } from 'react'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant'
import { setLoading,setUser } from '@/redux/authSlice.js';
import { useSelector , useDispatch} from 'react-redux';
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
});
const {loading,user} = useSelector(store =>store.auth);
const navigate = useNavigate();
const dispatch = useDispatch();
const changeEventHandler = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
}
const submitHandler = async (e) => {
  e.preventDefault();
  try{
    dispatch(setLoading(true));
  const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});
if (res.data.success) {
  dispatch(setUser(res.data.user));
    navigate("/");
    toast.success(res.data.message);
}
}
catch(error){
  console.log(error);
  toast.error(error.response.data.message);
}finally {
  dispatch(setLoading(false));
}
}
useEffect(()=>{
  if(user){
    navigate("/");
  }
})
  return (
    <div className="min-h-screen bg-gradient-to-r  bg-white flex items-center justify-center p-4">
      <div className='flex items-center justify-center max-w-7xl mx-auto w-full flex-col lg:flex-row'>
        
        {/* Image/Icon Section */}
        <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 p-8">
          <div className="bg-purple-400 p-4 rounded-full shadow-lg">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" 
              alt="User login illustration"
              className="w-40 h-40 object-cover"
            />
          </div>
          <p className="text-purple-400 text-xl mt-4">Welcome Back! Please Login</p>
        </div>

        {/* Form Section */}
        <form 
         onSubmit={submitHandler}
          className='w-full lg:w-1/2 bg-white border border-gray-200 rounded-md p-8 shadow-lg transition-all duration-500 hover:shadow-xl'
        >
          <h1 className='font-bold text-3xl text-gray-800 mb-5 text-center'>Login</h1>
          
          <div className='my-4'>
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

          <div className='my-4'>
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

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
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
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
        
          {/* Loading State Button */}
          {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
          {/* Submit Button
          <Button type="submit" className="w-full bg-purple-600 text-white py-2 my-4 hover:bg-purple-700 transition-colors duration-300">
            Login
          </Button> */}

          <span className='text-sm text-gray-600'>
            Don't have an account? <Link to="/signup" className='text-indigo-600 hover:underline'>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login
