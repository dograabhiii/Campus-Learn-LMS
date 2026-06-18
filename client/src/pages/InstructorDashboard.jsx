import InstructorSidebar from "../components/InstructorSidebar";
import { useEffect, useState } from "react";
import API from "../services/api";

const InstructorDashboard = () => {

  const [courses, setCourses] = useState([]);
  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const token =
          localStorage.getItem("token");
        const { data } = await API.get(

          "/courses/instructor-courses",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setCourses(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchCourses();

  }, []);

  return (
    <div className="flex">

      <InstructorSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Instructor Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-gray-500">
              Total Courses
            </h2>

            <h1 className="text-4xl font-bold text-blue-900">
              {courses.length}
            </h1>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-gray-500">
              Total Students
            </h2>

            <h1 className="text-4xl font-bold text-blue-900">
              {courses.reduce(
                (total, course) =>
                  total + (course.enrolledStudents?.length || 0),
                0
              )}
            </h1>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-gray-500">
              Revenue
            </h2>

            <h1 className="text-4xl font-bold text-blue-900">
              ₹{
                courses.reduce(

                  (total, course) =>
                    total +
                    (
                      course.price *
                      (course.enrolledStudents?.length || 0)
                    ),
                  0
                )
              }
            </h1>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;