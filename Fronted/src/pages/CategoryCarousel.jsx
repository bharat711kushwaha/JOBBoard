import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Button } from '../components/ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "DevOps Engineer",
    "Mobile App Developer",
    "Blockchain Developer",
    "Cybersecurity Expert",
    "UI/UX Designer",
    "AI/ML Engineer",
    "Database Administrator",
    "Game Developer",
    "Cloud Architect",
    "IT Support Specialist"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        // Dispatch search query first
        dispatch(setSearchedQuery(query));

        // Adding a slight delay before navigating to ensure state is updated
        setTimeout(() => {
            navigate("/browse");
        }, 100); // Delay of 100ms
    };

    return (
        <div className="relative w-full max-w-xl mx-auto my-20">
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="rounded-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-colors duration-300"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="text-[#F83002]" />
                <CarouselNext className="text-[#F83002]" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
