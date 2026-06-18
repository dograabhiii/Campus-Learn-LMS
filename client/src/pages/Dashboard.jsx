import enrollImg from "../assets/online-education.gif";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import CourseCard from "../components/CourseCard";

const Dashboard = () => {

  const [value, setValue] = useState(0); // start from 0
  const targetValue = 0;
  useEffect(() => {
    // trigger animation after mount
    const timeout = setTimeout(() => {
      setValue(targetValue);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  const userDetails = JSON.parse(localStorage.getItem("user")) || {};
  // console.log(userDetails)


  const [courses, setCourses] = useState([]);
  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const token = localStorage.getItem("token");

        const { data } = await API.get("/courses/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setCourses(data);

      } catch (error) {

        console.log(error);

      }
    };
    fetchCourses();
    

  }, []);
  

  return (
    <div className="flex ">
      <section className="profile-left h-[90vh] sticky top-20 ">
        <div className="profile-img">
          <img src="https://static.thenounproject.com/png/638636-200.png" alt="" height={50} width={50} />
        </div>
        <div className="left-btns">
          <button>Dashboard</button>
          <button>My Courses</button>
          <button>Progress</button>
          <button>Quizes</button>
          <button>Logout</button>
        </div>
      </section>
      <section className="profile-right ">
        <div>
          <h1 className="text-3xl tracking-widest bold">Welcome {userDetails.name || "User"}!</h1>
        </div>
        <div className="progress flex gap-5">
          <div className="flex ">
            <img src={enrollImg} alt="" height={80} width={100} />
            <div className="enroll-detail flex flex-col justify-center items-center">
              <h1 className="text-4xl text-blue-900 font-semibold"> {courses.length}</h1>
              <h1 className="text-2xl ">Enrolled Courses</h1>
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <CircularProgressbar value={value}
                text={`${value}%`}
                styles={{
                  path: {
                    transition: "stroke-dashoffset 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
                  },
                }} className="h-[110px]" />
            </div>
            <div className="enroll-detail flex flex-col justify-center items-center">
              <h1 className="text-4xl text-blue-900 font-semibold">{value}% </h1>
              <h1 className="text-2xl">Progress</h1>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl tracking-widest bold mb-5">My Courses</h1>
          {/* <div className=" text-gray-500">No courses enrolled</div> */}
          <div className="grid grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard 
              key={course._id} 
              course={course} 
              enrolled={true}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;