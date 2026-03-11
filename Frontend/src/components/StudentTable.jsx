export default function StudentTable({
    students,
    deleteStudent,
    editStudent
}) {

    return (

        <table className="w-full bg-white shadow rounded">

            <thead className="bg-gray-200">

                <tr>

                    <th className="p-3">Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {students.map((s) => (

                    <tr key={s.id} className="text-center border-t">

                        <td className="p-2">{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.age}</td>

                        <td className="space-x-2">

                            <button
                                onClick={() => editStudent(s)}
                                className="bg-yellow-400 px-3 py-1 rounded cursor-pointer">

                                Edit

                            </button>

                            <button
                                onClick={() => deleteStudent(s.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">

                                Delete

                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    )
}