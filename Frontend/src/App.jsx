import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    const res = await getStudents();
    setStudents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (data) => {
    if (editData) {
      await updateStudent(editData.id, data);
      setEditData(null);
    } else {
      await addStudent(data);
    }
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    if (confirm("Delete this student?")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  const handleEditStudent = (student) => {
    setEditData(student);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer]);
    saveAs(data, "students.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-600 text-white p-5 text-center text-2xl font-bold shadow">
        Student Management Dashboard
      </header>

      <div className="max-w-4xl mx-auto p-6">

        <StudentForm
          addStudent={handleAddStudent}
          editData={editData}
        />

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold text-blue-600">
            Students List
          </h2>

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Download Excel
          </button>

        </div>

        {loading ? (
          <div className="text-center text-lg">
            Loading students...
          </div>
        ) : (
          <StudentTable
            students={students}
            deleteStudent={handleDeleteStudent}
            editStudent={handleEditStudent}
          />
        )}

      </div>
    </div>
  );
}

export default App;