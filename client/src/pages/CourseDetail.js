import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pages.css';

function CourseDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetchCourseData();
  }, [id, user]);

  const fetchCourseData = async () => {
    try {
      const courseRes = await axios.get(`/api/courses/${id}`);
      setCourse(courseRes.data);

      const lessonsRes = await axios.get(`/api/lessons/course/${id}`);
      setLessons(lessonsRes.data);

      if (user) {
        const progressRes = await axios.get(`/api/progress/user/${user.id}`);
        setCompleted(progressRes.data.map(p => p.lesson_id));
      }
    } catch (error) {
      console.error('Failed to load course data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/progress/complete', {
        user_id: user.id,
        lesson_id: selectedLesson.id
      });
      setCompleted([...completed, selectedLesson.id]);
    } catch (error) {
      console.error('Failed to mark lesson as complete', error);
    }
  };

  if (loading) return <div className="page container"><p>Loading...</p></div>;
  if (!course) return <div className="page container"><p>Course not found</p></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="course-detail">
          <div className="course-header">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
          </div>

          <div className="course-content">
            <div className="lessons-sidebar">
              <h3>Lessons</h3>
              <div className="lessons-list">
                {lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    className={`lesson-item ${selectedLesson?.id === lesson.id ? 'active' : ''} ${completed.includes(lesson.id) ? 'completed' : ''}`}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    {completed.includes(lesson.id) && '✓'}
                    {lesson.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="lesson-viewer">
              {selectedLesson ? (
                <>
                  <h2>{selectedLesson.title}</h2>
                  <div className="lesson-content">
                    {selectedLesson.content}
                  </div>
                  <button
                    onClick={handleCompleteLesson}
                    className={`btn ${completed.includes(selectedLesson.id) ? 'btn-secondary' : 'btn-primary'}`}
                    disabled={completed.includes(selectedLesson.id)}
                  >
                    {completed.includes(selectedLesson.id) ? '✓ Completed' : 'Mark as Complete'}
                  </button>
                </>
              ) : (
                <p>Select a lesson to get started</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
