import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIInstance } from "../ApiInstance";
// import '../CSS/Home.css';
import "../CSS/Editstudent.css";
import { ToastContainer } from "react-toastify";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    age: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await APIInstance.get(
          `http://localhost:5300/getStudent/${id}`
        );
        console.log(response);
        const result = response.data[0]; // Assuming data is an array with one student object
        setStudent(result);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await APIInstance.put(`http://localhost:5300/updateStud/${id}`, student);

      navigate("/home");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <>
    <div className="edit-student-container">
      <h1>Edit Student</h1>
      <form>
        <table>
          {/* <thead>
            <tr>
              <th>Field</th>
              <th>Input</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td>
                <label>Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={student.name || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Age:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="age"
                  value={student.age || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Address:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={student.address || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Phone:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={student.phone || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={student.email || ''}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <ToastContainer/>
    </>
  );
}

export default EditStudent;







// backup code without design
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { APIInstance } from '../ApiInstance';

// function EditStudent() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [student, setStudent] = useState({
//         name: '',
//         age: '',
//         address: '',
//         phone: '',
//         email: ''
//     });

//     useEffect(() => {
//         const fetchStudent = async () => {
//             try {
//                 const response = await APIInstance.get(`http://localhost:5300/getStudent/${id}`);
//                 console.log(response);
//                 const result = response.data[0]; // Assuming data is an array with one student object
//                 setStudent(result);
//             } catch (error) {
//                 console.error('Error fetching student:', error);
//             }
//         };
//         fetchStudent();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setStudent(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSave = async () => {
//         try {
//             await APIInstance.put(`http://localhost:5300/updateStud/${id}`, student);
//             navigate('/home');
//         } catch (error) {
//             console.error('Error updating student:', error);
//         }
//     };

//     return (
//         <div className="edit-student-container">
//             <h1>Edit Student</h1>
//             <form>
//                 <label>Name:</label>
//                 <input type="text" name="name" value={student.name || ''} onChange={handleChange} />
//                 <label>Age:</label>
//                 <input type="number" name="age" value={student.age || ''} onChange={handleChange} />
//                 <label>Address:</label>
//                 <input type="text" name="address" value={student.address || ''} onChange={handleChange} />
//                 <label>Phone:</label>
//                 <input type="text" name="phone" value={student.phone || ''} onChange={handleChange} />
//                 <label>Email:</label>
//                 <input type="email" name="email" value={student.email || ''} onChange={handleChange} />
//                 <button type="button" onClick={handleSave}>Save</button>
//             </form>
//         </div>
//     );
// }

// export default EditStudent;
