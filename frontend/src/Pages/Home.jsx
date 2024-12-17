import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIInstance } from '../ApiInstance';
import '../CSS/Home.css';

function Home() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await APIInstance.get(`http://localhost:5300/getStud`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editstud/${id}`);
    };

    const navToPage = () => {
        navigate('/');
    };


    const handleDelete = async (id) => {
        try {
            await APIInstance.delete(`http://localhost:5300/deleteStud/${id}`);
            setStudents(students.filter(student => student._id !== id));
            console.log(`Deleted student with id: ${id}`);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

  
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="student-list-container">
            <button className='create-btn' onClick={navToPage} >Create</button>
            <div className='search-bar'>
            <h1>List of Students</h1>
            <input
                className='input-data'
                type='search'
                placeholder='Search here'
                value={searchTerm}
                onChange={handleSearch}
            />
            </div>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.address}</td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => handleEdit(student._id)}>Edit</button>
                                    <button className='edit-btn' onClick={() => handleDelete(student._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
