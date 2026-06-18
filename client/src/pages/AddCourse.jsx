import { useState } from "react";
import API from "../services/api";
import InstructorSidebar from "../components/InstructorSidebar";
import { Link } from "react-router-dom";

const AddCourse = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    youtube: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post("/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Course Created");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="flex">

      <InstructorSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Add Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-[500px]"
        >

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="youtube"
            placeholder="Youtube Link"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

           <textarea
            name="syllabus"
            placeholder="syllabus(in 6-points)"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <button type="submit" className="bg-blue-900 text-white p-3 rounded-xl">
          <Link to="/instructor/my-courses" >
            Publish Course
          </Link>
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default AddCourse;