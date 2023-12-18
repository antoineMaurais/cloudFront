import React, { useState, useEffect } from 'react';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  className: string;
}

// const IP = "http://192.168.100.102:3000"
// const IP = "http://148.60.225.219:3000"
const IP = "api"

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [apiStatus, setApiStatus] = useState('');
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', className: '' });

  useEffect(() => {
    // Vérification de la connexion à l'API
    fetch(IP+'/')
      .then(response => response.text())
      .then(data => setApiStatus(data))
      .catch(err => setApiStatus('Erreur lors de la connexion à l\'API'));

    // Récupération des étudiants
    fetch(IP+'/personnes')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    fetch(IP+'personnes', {
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
      {apiStatus && <p>Statut de l'API : {apiStatus}</p>}
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
