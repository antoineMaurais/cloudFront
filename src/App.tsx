import React, { useState, useEffect } from 'react';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  className: string;
}

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', className: '' });

  useEffect(() => {
    fetch('/api/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then(response => response.json())
      .then(data => setStudents([...students, data]));
  };

  return (
    <div>
      <h1>School Management System</h1>
      <div>
        <h2>Add Student</h2>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
        <input type="text" name="className" placeholder="Class" onChange={handleInputChange} />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
      <div>
        <h2>All Students</h2>
        <ul>
          {students.map(student => (
            <li key={student._id}>
              {student.firstName} {student.lastName} - {student.className}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
