import { useEffect, useState } from "react";
import API from "../services/api";
import CourseCard from "../components/CourseCard";


const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await API.get("/courses");
      setCourses(data);
    };

    fetchCourses(); 
  }, []);

  return (
    <>
      <div className="courses-head">
        <h1 className="text-4xl font-semibold">All Courses</h1>
        <p>Explore our wide range of courses and boost your skills</p>
        <div className="grid grid-cols-4 gap-8" style={{ marginTop:"40px"}}>
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))} 
        </div>
        <div>
        </div>
      </div>
    </>
  );
};

export default Courses;