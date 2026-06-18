import { Routes, Route  } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import InstructorDashboard from "../pages/InstructorDashboard";
import AddCourse from "../pages/AddCourse";
import InstructorCourses from "../pages/InstructorCourses";
import Learning from "../pages/Learning";
import InstructorStudents from "../pages/InstructorStudents";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/instructor/add-course" element={<AddCourse />} />
        <Route path="/instructor/my-courses" element={
          // <ProtectedRoute allowedRole="instructor">
            <InstructorCourses />
          // </ProtectedRoute>
        }
        />

        <Route path="/learning" element={<Learning />} />
        <Route path="/instructor/students" element={<InstructorStudents/>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;