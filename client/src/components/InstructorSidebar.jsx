import { Link } from "react-router-dom";

const InstructorSidebar = () => {

  return (
    <div className="w-[250px] h-screen bg-blue-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-10">
        Instructor
      </h1>

      <div className="flex flex-col gap-5">

        <Link to="/instructor">
          Dashboard
        </Link>

        <Link to="/instructor/add-course">
          Add Course
        </Link>

        <Link to="/instructor/my-courses">
          My Courses
        </Link>

        <Link to="/instructor/students">
          <button>Students</button>
        </Link>

      </div>
    </div>
  );
};

export default InstructorSidebar;