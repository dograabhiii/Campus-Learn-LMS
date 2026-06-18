import { useEffect, useState } from "react";
import API from "../services/api";
import InstructorSidebar from "../components/InstructorSidebar";

const InstructorCourses = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const token = localStorage.getItem("token");

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
          My Courses
        </h1>

        <div className="grid grid-cols-3 gap-6">

          {courses.map((course) => (

            <div
              key={course._id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden"
            >

              <img
                src={course.image}
                alt=""
                className="h-[200px] w-full object-cover"
              />

              <div className="p-5">

                <h1 className="text-2xl font-bold">
                  {course.title}
                </h1>

                <p className="text-gray-500 mt-2">
                  {course.description}
                </p>

                <div className="flex justify-between mt-5">

                  {/* <button
                    className="bg-blue-900 text-white px-5 py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                  >
                    Delete
                  </button> */}

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default InstructorCourses;