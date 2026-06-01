import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Pages.css';

function Home() {
  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h1>Welcome to Learning Hub</h1>
          <p>Discover amazing courses and expand your knowledge</p>
          <Link to="/courses" className="btn btn-primary btn-large">
            Explore Courses
          </Link>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Comprehensive Courses</h3>
            <p>Learn from structured, well-organized courses</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your learning journey with detailed progress tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Achieve Goals</h3>
            <p>Complete lessons and achieve your learning milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
