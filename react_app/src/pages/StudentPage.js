import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import StudentProfileModal from "../components/StudentProfileModal";
import "./StudentPage.css";

export default function StudentPage() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    parent_name: "",
    parent_contact_primary: "",
    parent_contact_secondary: "",
    grade: "",
    board: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await api.addStudent(token, form);
      const updatedStudents = await api.getStudents(token);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    setForm({
      first_name: "",
      last_name: "",
      parent_name: "",
      parent_contact_primary: "",
      parent_contact_secondary: "",
      grade: "",
      board: "",
    });
    } catch (err) {
      setError("Failed to add student. Please try again.");
      console.error("Error adding student:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.deleteStudent(token, id);
        const updatedStudents = await api.getStudents(token);
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
      } catch (err) {
        setError("Failed to delete student. Please try again.");
        console.error("Error deleting student:", err);
      }
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredStudents(students);
      return;
    }

    try {
      const searchResults = await api.searchStudents(token, query);
      setFilteredStudents(searchResults);
    } catch (err) {
      console.error("Error searching students:", err);
      // Fallback to client-side filtering
      const filtered = students.filter(student => 
        student.first_name.toLowerCase().includes(query.toLowerCase()) ||
        student.last_name.toLowerCase().includes(query.toLowerCase()) ||
        student.parent_name.toLowerCase().includes(query.toLowerCase()) ||
        student.grade.toString().includes(query) ||
        student.board.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await api.getStudents(token);
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError("Failed to fetch students. Please try again.");
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStudents();
    }
  }, [token]);

  if (loading && students.length === 0) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="student-page">
      <div className="container">
        <h2>Student Management</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <h3>Admit New Student</h3>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  name="first_name"
                  placeholder="First Name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Parent Name *</label>
                <input
                  name="parent_name"
                  placeholder="Parent Name"
                  value={form.parent_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Primary Contact *</label>
                <input
                  name="parent_contact_primary"
                  placeholder="Primary Contact"
                  value={form.parent_contact_primary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Secondary Contact</label>
                <input
                  name="parent_contact_secondary"
                  placeholder="Secondary Contact"
                  value={form.parent_contact_secondary}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Grade *</label>
                <select name="grade" value={form.grade} onChange={handleChange} required>
          <option value="">Select Grade</option>
          {[...Array(10).keys()].map(i => (
                    <option key={i+1} value={String(i+1)}>{`Grade ${i+1}`}</option>
          ))}
        </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Board *</label>
                <select name="board" value={form.board} onChange={handleChange} required>
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="SSC">SSC</option>
        </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Adding Student..." : "Admit Student"}
            </button>
      </form>
        </div>

        <div className="students-section">
          <div className="students-header">
            <h3>Admitted Students ({filteredStudents.length})</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search students by name, grade, or board..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleSearch("")}
                  className="clear-search-btn"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {loading && <div className="loading">Loading...</div>}
          
          {filteredStudents.length === 0 && !loading ? (
            <div className="no-students">
              {searchQuery ? "No students found matching your search." : "No students found."}
            </div>
          ) : (
            <div className="students-grid">
              {filteredStudents.map(student => (
                <div key={student.id} className="student-card">
                  <div 
                    className="student-info"
                    onClick={() => handleStudentClick(student)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h4>{student.first_name} {student.last_name}</h4>
                    <p><strong>Grade:</strong> {student.grade} ({student.board})</p>
                    <p><strong>Parent:</strong> {student.parent_name}</p>
                    <p><strong>Contact:</strong> {student.parent_contact_primary}</p>
                    {student.parent_contact_secondary && (
                      <p><strong>Secondary:</strong> {student.parent_contact_secondary}</p>
                    )}
                    <p><strong>Admitted:</strong> {new Date(student.admission_date).toLocaleDateString()}</p>
                    <div className="student-balance">
                      <span className="balance-label">Balance:</span>
                      <span className={`balance-amount ${student.total_paid < (student.fee_structure?.fee_amount || 0) ? 'due' : 'paid'}`}>
                        ₹{(student.fee_structure?.fee_amount || 0) - student.total_paid}
                      </span>
                    </div>
                  </div>
                  <div className="student-actions">
                    <button 
                      onClick={() => handleStudentClick(student)}
                      className="view-btn"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleDelete(student.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <StudentProfileModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
