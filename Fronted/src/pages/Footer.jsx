import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white py-8 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* About Section */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-300">
                            We are the leading job portal connecting job seekers with top companies. Join us to find your dream job today!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <ul>
                            <li className="mb-2"><a href="/" className="text-gray-300 hover:text-[#6A38C2] transition duration-300">Home</a></li>
                            <li className="mb-2"><a href="/browse" className="text-gray-300 hover:text-[#6A38C2] transition duration-300">Browse Jobs</a></li>
                            <li className="mb-2"><a href="/about" className="text-gray-300 hover:text-[#6A38C2] transition duration-300">About Us</a></li>
                            <li className="mb-2"><a href="/contact" className="text-gray-300 hover:text-[#6A38C2] transition duration-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-300">Email: support@jobportal.com</p>
                        <p className="text-gray-300">Phone: +1 234 567 890</p>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <div className="flex flex-col md:flex-row">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="p-2 rounded-l-lg border-none outline-none"
                        />
                        <button className="bg-[#6A38C2] text-white p-2 rounded-r-lg hover:bg-[#F83002] transition duration-300">Subscribe</button>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center mt-6">
                    <a href="https://www.facebook.com/profile.php?id=100061172886439" className="mx-2 text-gray-300 hover:text-[#6A38C2] transition duration-300">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="https://x.com/Bharatkush07?t=Va-lAlW8I65yWDiLpBocWQ&s=0" className="mx-2 text-gray-300 hover:text-[#6A38C2] transition duration-300">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/bharat-kushwaha-9ab9a0281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="mx-2 text-gray-300 hover:text-[#6A38C2] transition duration-300">
                        <FaLinkedinIn size={24} />
                    </a>
                    <a href="https://www.instagram.com/bharatkushwaha4934?igsh=djFtczA4Mm5seTlm" className="mx-2 text-gray-300 hover:text-[#6A38C2] transition duration-300">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm mt-6">
                © {new Date().getFullYear()} Job Portal. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
