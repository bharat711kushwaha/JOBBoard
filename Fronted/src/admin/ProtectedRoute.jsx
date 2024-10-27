import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(true); // For handling loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== 'recruiter' && user.role !== 'admin') {
      navigate("/login"); // Redirecting to login if user is not authorized
    } else {
      setLoading(false); // Allow access once user is valid
    }
  }, [user, navigate]); // Dependency on `user` for re-evaluation

  // While the user information is being fetched or the authentication state is not determined
  if (loading) {
    return <div>Loading...</div>; // You could add a spinner or loading UI
  }

  return <>{children}</>;
};

export default ProtectedRoute;
