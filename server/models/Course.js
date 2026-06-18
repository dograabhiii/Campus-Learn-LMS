import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // instructor ID
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // instructor display name
    instructorName: {
      type: String,
      // required: true,
    },

    price: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: ""
    },
    syllabus: {
      type: [String],
      default: []
    },
    youtube: {
      type: String,
      default: ""
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);