import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import CourseCard from "../components/CourseCard";
import Courses from "./Courses";
import PaymentModel from "../components/PaymentModel";



const CourseDetails = () => {

  const { id } = useParams();
  const [coursedetails, setCoursedetails] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);


  const user =
    JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const similarCourses = async () => {
      const { data } = await API.get('/courses');
      setCourses(data);
    }
    similarCourses();
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


  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // No token, can't be enrolled
        const { data } = await API.get("courses/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const enrolled = data.some(course => course._id === id);
        setIsEnrolled(enrolled);
      }
      catch (error) {
        console.log(error);
      }
    };
    checkEnrollment();
  }, [id]);

  const handleEnroll = () => {
    const token = localStorage.getItem("token");
    // NOT LOGGED IN
    if (!token) {

      alert("Please login first");

      return;
    }
    // LOGGED IN
    setShowPayment(true);
  };


  if (loading || !coursedetails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl">Loading Course Data...</h1>
      </div>
    );
  }

  // /Handle Payment

  const handlePayment = async () => {
    try {
      // 1. Create order
      const { data } = await API.post("/payment/create-order", {
        amount: coursedetails.price,
      });

      // 2. Razorpay config
      const options = {
        key: "rzp_test_SjbaUfa03GLQR4",
        amount: data.amount,
        order_id: data.id,
        name: "CampusLearn",
        handler: async function (response) {
          try {
            // 👉 Step 1: Verify payment (optional but good)
            await API.post("/payment/verify", response);

            // 👉 Step 2: Enroll user
            await API.post(`/courses/enroll/${coursedetails._id}`);

            alert("Payment Successful & Course Enrolled 🎉");

            setShowPayment(false);

          } catch (error) {
            console.log(error);
            alert("Something went wrong");
          }
          console.log("COURSE ID:", coursedetails?._id);
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.log(error);
    }
  };

  // console.log(coursedetails.syllabus);
  return (
    <div>
      <section className="bg-blue-900 text-white w-full h-[500px]">
        <div className="courseDetailHeader flex">
          <div className="courseDetail-left ">
            <h1 className="text-5xl text-center">{coursedetails.title}</h1>
            <p>{coursedetails.description}</p>
            {user?.role !== "instructor" && (

              isEnrolled ? (

                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  Start Learning
                </button>

              ) : (

                <button
                  onClick={handleEnroll}
                  className="bg-blue-900 text-white px-6 py-3 rounded-xl"
                >
                  Enroll Now
                </button>

              )

            )}
            <div className="courseDetailHeader-bottom ">
              <div>4.9 Rating</div>
              <div>12 Weeks</div>
              <div>Certificate</div>
            </div>
          </div>
          <div className="courseDetail-right">
            {coursedetails.image && (
              <img src={coursedetails.image} alt="" className="w-full" />
            )}
          </div>
        </div>
      </section>

      <section className="flex">
        <div className="courseDetail-syllabus w-[70%]">
          <h1 className="text-3xl">What you will learn</h1>
          <ul> {coursedetails.syllabus && coursedetails.syllabus.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          </ul>
          <div className="yt-link">
            <iframe width="80%" height="350" src={coursedetails.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

        </div>
        <div className="courseDetailSidebar w-[30%]">
          <div className="instructor ">
            <h3 className="text-[16px] text-blue-900">Instructor</h3>
            <div className="flex items-center">
              {coursedetails.instructImg && (
                <img src={coursedetails.instructImg} alt="" className="h-[120px] w-[120px]" />
              )}
              <h1 className="text-2xl instruct-name">{coursedetails.instructorName}</h1>
            </div>
            <button className="bg-blue-900 text-white">Message</button>
          </div>
          <div className="instructor coursePriceDetail">
            {/* <p className="h-5 bg-orange-500"></p> */}
            <div className="flex coursePriceDetail2">
              <h1 className="text-4xl"> ₹{coursedetails.price}</h1>
              <p className="text-sm flex flex-col justify-end text-red-600" >Limited time offer</p>
            </div>
            <p className="Card-footer-line"></p>
            <ul >
              <li>12 Weeks of Learning</li>
              <li>36 video Lessons</li>
              <li>Downloadable Resources</li>
              <li>Certification of Completion</li>
            </ul>
            {user?.role !== "instructor" && (

              isEnrolled ? (

                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  Start Learning
                </button>

              ) : (

                <button
                  onClick={handleEnroll}
                  className="bg-blue-900 text-white px-6 py-3 rounded-xl"
                >
                  Enroll Now
                </button>

              )

            )}
            {showPayment && (
              <PaymentModel
                course={coursedetails}
                onclose={() => setShowPayment(false)}
                onPayment={handlePayment}
              />
            )}

          </div>

        </div>
      </section>

      <section className="similar-course">
        <h1 className="text-3xl font-semibold">Similar Courses</h1>
        <div className="grid grid-cols-4 gap-8 overflow-x-auto">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;