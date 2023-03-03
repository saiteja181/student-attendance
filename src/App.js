import React, { useState, useEffect } from 'react';

function App() {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const addStudent = () => {
    const newStudent = { rollNumber, name, checkinTime, checkoutTime };
    setStudents([...students, newStudent]);
    setRollNumber('');
    setName('');
    setCheckinTime('');
    setCheckoutTime('');
  };

  const removeStudent = (rollNumber) => {
    const updatedStudents = students.filter((student) => student.rollNumber !== rollNumber);
    setStudents(updatedStudents);
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">Student Attendance</h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="flex flex-col mb-2">
          <label htmlFor="rollNumber" className="font-bold mb-2">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="checkinTime" className="font-bold mb-2">
            Checkin Time
          </label>
          <input
            type="text"
            id="checkinTime"
            value={checkinTime}
            onChange={(e) => setCheckinTime(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="checkoutTime" className="font-bold mb-2">
            Checkout Time
          </label>
          <input
            type="text"
            id="checkoutTime"
            value={checkoutTime}
            onChange={(e) => setCheckoutTime(e.target.value)}
            className="border p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px
          4 rounded"
          onClick={addStudent}
        >
          Add Student
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold mb-2">Students Present in School</h2>
        <p>Number of students present: {students.length}</p>
        <ul className="list-disc ml-4">
          {students.map((student) => (
            <li key={student.rollNumber} className="flex justify-between mb-2">
              <span>
                {student.rollNumber} - {student.name}
              </span>
              <span>
                {student.checkinTime} - {student.checkoutTime}
              </span>
              <button
                className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                onClick={() => removeStudent(student.rollNumber)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App; 