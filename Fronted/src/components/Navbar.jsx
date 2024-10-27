import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice.js';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import store from '@/redux/store';

// Import the logo image
import logo from "/lo.webp" ;  // Adjust the path based on your folder structure

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="w-full top-0 z-50 bg-white shadow-md fixed">
             {/* Logo Image with Animation */}
             <div 
                    className="logo-container"
                    style={{
                        animation: 'slideIn 0.8s ease-out'
                    }}
                ></div>
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-0">
               
                {/* Logo Image */}
                <div>
                <Link to="/">
                        <img
                            src={logo}
                            alt="JobBoard Logo"
                            className="logo h-16 w-auto transition-transform transform hover:scale-110 duration-300 shadow-lg hover:shadow-xl"
                            style={{
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))'
                            }}
                        />
                    </Link>
                </div>
                
                {/* Navigation Links */}
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5 text-gray-700">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/admin/companies">Companies</Link></li>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/">Home</Link></li>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/jobs">Jobs</Link></li>
                                    <li className="hover:text-[#6A38C2] transition-colors"><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Authentication Buttons or User Avatar */}
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline" className="text-[#6A38C2] border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className="flex gap-2 space-y-2">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 text-gray-600">
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default Navbar;
