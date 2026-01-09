import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { getAllStudents, createStudent, deleteStudent } from '../services/studentApi.js';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', rollNumber: '', course: '', email: '' });
  const [query, setQuery] = useState('');

  const addedBy = useMemo(() => localStorage.getItem('userName') || 'Unknown', []);

  useEffect(() => {
    document.title = 'Student Desk • edufuture';
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllStudents();
      setStudents(data);
    } catch (e) {
      setError(e.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { ...form, addedBy };
      const res = await createStudent(payload);
      setSuccess(res.message || 'Student added successfully');
      setForm({ name: '', rollNumber: '', course: '', email: '' });
      await loadStudents();
    } catch (e) {
      setError(e.message || 'Failed to add student');
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await deleteStudent(id);
      setSuccess(res.message || 'Student deleted successfully');
      await loadStudents();
    } catch (e) {
      setError(e.message || 'Failed to delete student');
    }
  };

  const filtered = students.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      String(s.name || '').toLowerCase().includes(q) ||
      String(s.rollNumber || '').toLowerCase().includes(q) ||
      String(s.course || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="page-container student-desk">
      <Navbar />
      <main className="main-content">
        <section className="student-header">
          <div>
            <h1>Student Desk</h1>
            <p className="subtitle">Manage enrollments and keep records tidy.</p>
          </div>
          <div className="header-stats">
            <span className="stat-pill">Total: {students.length}</span>
            <span className="stat-pill success">Active: {filtered.length}</span>
          </div>
        </section>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <section className="student-form">
          <h2>Add Student</h2>
          <form onSubmit={onSubmit} className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" placeholder="Jane Doe" value={form.name} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label>Roll Number</label>
              <input name="rollNumber" placeholder="e.g., 23A041" value={form.rollNumber} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label>Course</label>
              <input name="course" placeholder="Course name" value={form.course} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={onChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading} className="submit-button">
                {loading ? 'Saving…' : 'Add Student'}
              </button>
              <span className="added-by">Added by: {addedBy}</span>
            </div>
          </form>
        </section>

        <section className="action-bar">
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, roll, or course"
          />
        </section>

        <section>
          {loading && students.length === 0 ? (
            <div>Loading…</div>
          ) : (
            <div className="student-grid">
              {filtered.map((s) => (
                <div key={s._id} className="student-card">
                  <div className="card-header">
                    <h3>{s.name}</h3>
                    <button className="delete-button" onClick={() => onDelete(s._id)}>✖</button>
                  </div>
                  <div className="card-body">
                    <div className="row"><span className="key">Roll</span><span className="val">{s.rollNumber}</span></div>
                    <div className="row"><span className="key">Course</span><span className="val">{s.course}</span></div>
                    <div className="row"><span className="key">Email</span><span className="val">{s.email}</span></div>
                    <div className="row"><span className="key">Added By</span><span className="val">{s.addedBy}</span></div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && !loading && (
                <div className="empty-state">No matching students</div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Students;
