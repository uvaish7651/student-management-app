import axios from "axios";

const API = "https://student-management-app-5lmk.onrender.com/students";

export const getStudents = () => axios.get(API);
export const addStudent = (data) => axios.post(API, data);
export const updateStudent = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);
