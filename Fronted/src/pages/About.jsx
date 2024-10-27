import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing icons for values

const About = () => {
    return (
        <div className="container mx-auto px-4 py-16 bg-white text-gray-900">
            <h1 className="text-4xl font-bold mb-8 text-center text-[#2C3E50] animate-fadeIn">
                About Us
            </h1>

            <p className="text-gray-700 text-lg mb-8 text-center max-w-2xl mx-auto">
                Welcome to our job portal! We are dedicated to bridging the gap between job seekers and top employers. Our mission is to simplify the job search process and empower candidates to find their dream careers.
            </p>

            <div className="max-w-3xl mx-auto">
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    With years of experience in the recruitment industry, our team understands the challenges that both job seekers and employers face. We leverage technology and innovative strategies to provide the best matching services.
                </p>

                <h2 className="text-2xl font-semibold mt-12 mb-6 text-[#6A38C2] border-b-2 border-gray-200 pb-2 animate-slideIn">
                    Our Values
                </h2>
                <ul className="list-none space-y-4 mb-8">
                    <li className="flex items-center text-lg">
                        <FaCheckCircle className="text-[#F83002] mr-3" />
                        <span className="text-gray-700">Integrity: We believe in honest and transparent processes.</span>
                    </li>
                    <li className="flex items-center text-lg">
                        <FaCheckCircle className="text-[#F83002] mr-3" />
                        <span className="text-gray-700">Innovation: Constantly improving our platform for better user experience.</span>
                    </li>
                    <li className="flex items-center text-lg">
                        <FaCheckCircle className="text-[#F83002] mr-3" />
                        <span className="text-gray-700">Empowerment: Providing tools and resources to help candidates succeed.</span>
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-12 mb-6 text-[#6A38C2] border-b-2 border-gray-200 pb-2 animate-slideIn">
                    Join Us
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-10">
                    Whether you are a job seeker or an employer, we invite you to join our community. Together, we can build a brighter future for careers everywhere!
                </p>
            </div>
        </div>
    );
};

export default About;
