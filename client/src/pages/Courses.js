import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Pages.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page container"><p>Loading courses...</p></div>;
  if (error) return <div className="page container"><p>{error}</p></div>;

  return (
    <div className="page">
      <div className="container">
        <h1>All Courses</h1>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <span className="course-category">{course.category}</span>
              <Link to={`/courses/${course.id}`} className="btn btn-primary">
                View Course
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
