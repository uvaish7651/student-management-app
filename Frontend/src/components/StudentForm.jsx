import { useEffect, useState } from "react";

export default function StudentForm({ addStudent, editData }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        age: ""
    });

    useEffect(() => {
        if (editData) {
            setForm(editData);
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.age) {
            alert("All fields are required");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(form.email)) {
            alert("Invalid email");
            return;
        }

        addStudent({
            ...form,
            age: Number(form.age)
        });

        setForm({
            name: "",
            email: "",
            age: ""
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
        >

            <h2 className="text-xl font-bold mb-4">
                {editData ? "Edit Student" : "Add Student"}
            </h2>

            <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 w-full mb-3 rounded"
                placeholder="Name"
            />

            <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2 w-full mb-3 rounded"
                placeholder="Email"
            />

            <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="border p-2 w-full mb-3 rounded"
                placeholder="Age"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                {editData ? "Update Student" : "Add Student"}
            </button>

        </form>
    );
}