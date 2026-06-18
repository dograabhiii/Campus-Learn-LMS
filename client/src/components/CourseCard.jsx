import { Link } from "react-router-dom";

const CourseCard = ({ course, enrolled }) => {
  // console.log(course)
  return (
    <div className=""
      style={{
        border: "1px solid #ddd",
        // padding: "15px",
        borderRadius: "10px",
        // width: "350px",
        backgroundColor: "white"
      }}
    >
      <img
        src={course.image || "https://via.placeholder.com/250x150"}
        alt={course.title}
        height={200}
        className="rounded-t-[10px] h-[200px] w-full"
      />
      <div className="course-card">
        <h3 className="line-clamp-2 min-h-[70px]">{course.title}</h3>
        <p className="text-gray-700 leading-5 line-clamp-2">{course.description}</p>
        <p style={{marginTop:"5px"}}><strong>Instructor:</strong> {course.instructorName}</p>
        <div className="Card-footer-line" />
        <div className="courseCardFooter">
        <p><strong>₹{course.price}</strong></p>

        {enrolled ? (
          <Link to={`/courses/${course.title}`} className="bg-green-600 text-white px-6 py-3 rounded-xl">
            Continue Learning
          </Link>
        ) : (
          <Link to={`/courses/${course._id}`} className="bg-blue-900 text-white px-6 py-3 rounded-xl">
            Enroll Now
          </Link>
        )}
        </div>
      </div>
    </div>
    

  );
};

export default CourseCard;