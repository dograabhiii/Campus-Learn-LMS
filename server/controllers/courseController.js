import Course from "../models/Course.js";
import User from "../models/User.js";


// GET ALL COURSES

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET COURSE DETAIL

export const getCourseDetail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// CREATE COURSE - only for instructors

export const createCourse = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
      image,
      syllabus,
      youtube,
    } = req.body;

    // logged-in instructor
    const user = await User.findById(req.user.id);

    if (user.role !== "instructor") {

      return res.status(403).json({
        message: "Only instructors can create courses",
      });
    }

    const course = await Course.create({

      title,
      description,

      // instructor ID
      instructor: user._id,

      // instructor display name
      instructorName: user.name,

      price,
      image,
      syllabus,
      youtube,

    });

    res.status(201).json(course);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// ENROLL COURSE - only for students

export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;
    const course = await Course.findById(courseId);


    if (!courseId || courseId === "undefined") {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const user = await User.findById(userId);

    if (user.role === "instructor") {

  return res.status(403).json({

    message:
      "Instructors cannot enroll in courses",

  });
}

    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    // remove any null values (extra safety)
    user.enrolledCourses = user.enrolledCourses.filter(id => id);

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.enrolledCourses.push(courseId);
    course.enrolledStudents.push(userId);

    await course.save();
    await user.save();

    res.json({ message: "Enrolled successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Enrollment failed" });
  }
  //   console.log("USER:", req.user);
  // console.log("COURSE ID:", req.params.id);
};


// instructor courses

export const getInstructorCourses = async (
  req,
  res
) => {

  try {

    const courses = await Course.find({

      instructor: req.user.id,

    });

    res.json(courses);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};



export const getInstructorStudents =
  async (req, res) => {

    try {

      // get logged in instructor
      const instructor =
        await User.findById(req.user.id);

      // find instructor courses
      const courses = await Course.find({

        instructorName:
          instructor.name,

      }).populate(

        "enrolledStudents",

        "name email"
      );

      let students = [];

      courses.forEach((course) => {

        course.enrolledStudents.forEach(
          (student) => {

            students.push({

              courseName:
                course.title,

              studentName:
                student.name,

              studentEmail:
                student.email,

            });
          }
        );
      });

      console.log(students);

      res.json(students);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch students",

      });
    }
  };