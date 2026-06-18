import express from "express";
import {
  getCourses,
  createCourse,
  getCourseDetail,
  enrollCourse,
  getInstructorCourses,
  getInstructorStudents,
} from "../controllers/courseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", getCourses);

// MY COURSES ROUTE FIRST
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("enrolledCourses");

    res.json(user.enrolledCourses);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch courses"
    });
  }
});

// instructor-course
router.get("/instructor-courses", authMiddleware, getInstructorCourses);


// THEN DYNAMIC ROUTE
router.get("/instructor-students", authMiddleware, getInstructorStudents );


router.get("/:id", getCourseDetail);


router.post("/", authMiddleware, createCourse);

router.post("/enroll/:id", authMiddleware, enrollCourse);


export default router;