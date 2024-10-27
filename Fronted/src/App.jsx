import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import About from './pages/About.jsx';
import Footer from './pages/Footer';
import Contact from './pages/Contact';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import JobDescription from './pages/JobDescription';
import Companies from './admin/Companies';
import CompanyCreate from './admin/CompanyCreate';
import CompanySetup from './admin/CompanySetup';
import AdminJob from './admin/AdminJobs';
import PostJob from './admin/PostJob';
import Applicants from './admin/applicants';
import ProtectedRoute from './admin/ProtectedRoute';
import ErrorPage from './pages/ErrorPage'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/description/:id" element={<JobDescription />} />

        {/* Admin Routes (Protected) */}
        <Route
          path="/admin/Companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute>
              <CompanyCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Companies/:id"
          element={
            <ProtectedRoute>
              <CompanySetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route for Undefined Paths */}
        <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for undefined paths */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
