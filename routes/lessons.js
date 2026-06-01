const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Get lessons by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index',
      [req.params.courseId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM lessons WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create lesson
router.post('/', async (req, res) => {
  try {
    const { course_id, title, content, order_index } = req.body;
    const result = await pool.query(
      'INSERT INTO lessons (course_id, title, content, order_index) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, title, content, order_index]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
