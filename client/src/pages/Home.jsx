import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import CourseCard from "../components/CourseCard";
import Courses from "./Courses";


const Home = () => {

  const { id } = useParams();
  const [coursedetails, setCoursedetails] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latestCourses = async () => {
      const { data } = await API.get('/courses');
      setCourses(data);
    }
    latestCourses()
  }, []);

  useEffect(() => {
    const fetchCoursedetail = async () => {
      try {
        const { data } = await API.get(`/courses/${id}`);
        setCoursedetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading regardless of success/error
      }
    };
    fetchCoursedetail();
  }, [id]);

  // if (loading || !coursedetails) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <h1 className="text-2xl">Loading Course Data...</h1>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="homeImg">
        <div className="homeImg-text">
          <h1 className="text-7xl ">Prepare for </h1>
          <h1 className="text-7xl">Your Dream job</h1>
          <p>Enhance your skills, ace exams, and land your dream job <br />with our expert-led online courses and personalized learning tracks.</p>
          <div className="homeImg-btns">
            <Link to="/courses" className="bg-white text-blue-900 border y-5">Explore Courses</Link>
            <Link to="#" className="border">Join Now</Link>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="home-courses">

        <h2 className="home-subtitle">Popular Courses</h2>
        <div className="homeCourse-Cards grid grid-cols-2 md:grid-cols-4 gap-8">
          {courses.slice(7, 11).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section >

      {/* Why choose us */}

      <section>
        <div>
          <h2 className="home-subtitle">Why Learn with CampusLearn?</h2>
        </div>
        <div className="learnWithUs grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-10">
          <div className="">
            <h4 className="text-2xl">Expert Instructors</h4>
            <p>Learn from industry leaders and seasinsed educators</p>
          </div>
          <div>
            <h4 className="text-2xl">Interactive Quizzes</h4>
            <p>Test your knowledge with engaging and challenging quizzes</p>
          </div>
          <div>
            <h4 className="text-2xl">Certification</h4>
            <p>Earn a certificate to showcase your skills</p>
          </div>
          <div>
            <h4 className="text-2xl">Placement Support</h4>
            <p>Get guidence and resources for job placement</p>
          </div>
        </div>
      </section>

      {/* Latest Courses */}
      <section>
        <div>
          <h2 className="home-subtitle">Latest Courses</h2>
        </div>
        <div className="homeCourse-Cards grid grid-cols-2 md:grid-cols-4 gap-8">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="testimonial flex items-center bg-white">
          <div>
            <img src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt="" className="w-[150px] h-[150x]" />
          </div>
          <div>
            <p className="text-2xl">"<span className="text-blue-900">CamousLearn</span> held his and clinsued my scheers helping me tro land my dream job."</p>
            <p>- Rahul Sharma</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;