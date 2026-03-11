const pool = require("../config/db");

exports.getStudents = async (req, res) => {
  const result = await pool.query("SELECT * FROM students ORDER BY id");
  res.json(result.rows);
};

exports.addStudent = async (req, res) => {
  const { name, email, age } = req.body;

  const result = await pool.query(
    "INSERT INTO students(name,email,age) VALUES($1,$2,$3) RETURNING *",
    [name, email, age]
  );

  res.json(result.rows[0]);
};

exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;

  const result = await pool.query(
    "UPDATE students SET name=$1,email=$2,age=$3 WHERE id=$4 RETURNING *",
    [name, email, age, id]
  );

  res.json(result.rows[0]);
};

exports.deleteStudent = async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM students WHERE id=$1", [id]);

  res.json({ message: "Student deleted" });
};