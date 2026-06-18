import { useState } from "react";
import {
  FaPlayCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const syllabusData = [
  {
    title: "Introduction",
    lessons: [
      {
        type: "video",
        name: "Introduction to CSS",
        duration: "23m 17s",
      },
      {
        type: "video",
        name: "How to Insert CSS - Inline, Internal and External CSS",
        duration: "23m 24s",
      },
      {
        type: "video",
        name: "Comments in CSS",
        duration: "7m 41s",
      },
      {
        type: "assignment",
        name: "Assignment : Introduction",
        duration: "2m 45s",
      },
      {
        type: "quiz",
        name: "Quiz : Introduction",
        duration: "5m",
      },
    ],
  },

  {
    title: "Different Selectors",
    lessons: [],
  },

  {
    title: "CSS Specificity",
    lessons: [],
  },
];

const Syllabus = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderIcon = (type) => {
    switch (type) {
      case "video":
        return <FaPlayCircle />;
      case "assignment":
        return <FaFileAlt />;
      case "quiz":
        return <FaHourglassHalf />;
      default:
        return null;
    }
  };

  return (
    <div className="">
    <div className="syllabus-container">
      {syllabusData.map((section, index) => (
        <div className="syllabus-section" key={index}>
          
          {/* Header */}
          <div
            className="section-header"
            onClick={() => toggleSection(index)}
          >
            <h3>{section.title}</h3>

            {openIndex === index ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {/* Content */}
          {openIndex === index && (
            <div className="section-content">
              {section.lessons.map((lesson, i) => (
                <div className="lesson-item" key={i}>
                  
                  <input type="checkbox" />

                  <div className="lesson-details">
                    <p className="lesson-title">{lesson.name}</p>

                    <span className="lesson-duration">
                      {renderIcon(lesson.type)}
                      {lesson.duration}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Syllabus;