import { useEffect, useState }
from "react";

import API from "../services/api";

import InstructorSidebar
from "../components/InstructorSidebar";

const InstructorStudents = () => {

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    const fetchStudents =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const { data } =
            await API.get(

              "/courses/instructor-students",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          console.log(data);

          setStudents(data);

        } catch (error) {

          console.log(error);
        }
      };

    fetchStudents();

  }, []);

  return (

    <div className="flex">

      <InstructorSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">

          Enrolled Students

        </h1>

        <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">

          <thead className="bg-blue-900 text-white">

            <tr>

              <th className="p-4">
                Student Name
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Course
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map(
              (student, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-4 text-center text-blue-900">
                    {student.studentName}
                  </td>

                  <td className="p-4 text-center">
                    {student.studentEmail}
                  </td>

                  <td className="p-4 text-center">
                    {student.courseName}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default InstructorStudents;