import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../services/studentApi.js';

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    course: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (!user) {
      navigate('/');
      return;
    }
    setUserName(user);
    loadStudents();
  }, [navigate]);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editMode) {
        await updateStudent(currentStudent._id, formData);
        setMessage('Student updated successfully!');
      } else {
        await createStudent({ ...formData, addedBy: userName });
        setMessage('Student added successfully!');
      }
      setIsError(false);
      setFormData({ name: '', rollNumber: '', course: '', email: '' });
      setShowForm(false);
      setEditMode(false);
      setCurrentStudent(null);
      loadStudents();
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      course: student.course,
      email: student.email
    });
    setEditMode(true);
    setShowForm(true);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await deleteStudent(id);
      setIsError(false);
      setMessage('Student deleted successfully!');
      loadStudents();
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setCurrentStudent(null);
    setFormData({ name: '', rollNumber: '', course: '', email: '' });
    setMessage('');
  };

  const handleAddNew = () => {
    setShowForm(true);
    setEditMode(false);
    setCurrentStudent(null);
    setFormData({ name: '', rollNumber: '', course: '', email: '' });
    setMessage('');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-right">
          <span className="user-name">Welcome, {userName}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        {message && (
          <div className={`dashboard-message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {!showForm && (
          <button className="add-student-btn" onClick={handleAddNew}>
            + Add New Student
          </button>
        )}

        {showForm && (
          <div className="student-form-card">
            <h2>{editMode ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Student name"
                  />
                </div>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    required
                    placeholder="Roll number"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Course</label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    required
                    placeholder="Course name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editMode ? 'Update Student' : 'Add Student'}
                </button>
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="students-table-container">
          <h2>Students List ({students.length})</h2>
          {students.length === 0 ? (
            <p className="no-data">No students found. Add your first student!</p>
          ) : (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Added By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.email}</td>
                    <td>{student.addedBy}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(student)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(student._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
