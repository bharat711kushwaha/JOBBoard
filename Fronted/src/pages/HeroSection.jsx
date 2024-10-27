import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { toast } from 'sonner';
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handler for job search (uncomment this when Redux is set up)
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query)); 
        console.log(query);  
        navigate("/browse"); 
    }
    const browse =()=>{
        navigate("/browse"); 
    }
    const post =()=>{
        navigate("/login"); 
        toast.message("Please log in with your recruiter account to continue.");

    }

    return (
        <div className="relative text-center bg-[url('/bgjob.jpg')] bg-cover bg-center bg-no-repeat h-[600px] flex items-center justify-center">

            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay to darken the image */}
            <div className="relative z-10 flex flex-col gap-5 max-w-4xl mx-auto text-white">
                {/* Top Badge */}
                <span className="mx-auto px-4 py-2 rounded-full bg-white text-[#F83002] font-medium">
                    India's No. 1 Job Hunt Platform
                </span>

                {/* Title */}
                <h1 className="text-5xl font-extrabold leading-tight">
                    Search, Apply &<br /> 
                    Get Your <span className="text-[#6A38C2]">Dream Job</span> Today
                </h1>

                {/* Subtitle */}
                <p className="text-lg">
                    Your next opportunity is just a click away. Join thousands of professionals 
                    who have found their perfect job through us!
                </p>

                {/* Search Bar */}
                <div className="flex w-full md:w-[60%] shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto bg-white">
                    <input
                        type="text"
                        placeholder="Search by job title, company, or skills..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full py-3 text-black rounded-l-full"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] text-white hover:bg-[#5527a3]">
                        <Search className='h-5 w-5' />
                       
                    </Button>
                </div>

                {/* Call to Actions */}
                <div className="flex justify-center gap-4 mt-6">
                    <Button onClick ={browse}
                        className="px-6 py-3 bg-[#F83002] text-white font-semibold rounded-full hover:bg-[#e32d00] transition">
                        Browse Jobs
                        
                    </Button>
                    <Button onClick={post}
                        className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition">
                        Post a Job
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
