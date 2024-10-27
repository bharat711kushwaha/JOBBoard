import { setAllAppliedJobs } from "@/redux/jobSlice";  // This is fine
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/my-applications`, { withCredentials: true });
                console.log("API Response:", res.data);  // Log the API response
                if (res.data.success) {
                    // Dispatch the `applications` array directly
                    dispatch(setAllAppliedJobs(res.data.applications)); 
                    console.log("Dispatched:", res.data.applications);   
                } else {
                    console.log("No applications found");
                }
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
        };

        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
