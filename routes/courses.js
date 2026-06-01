const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create course (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const result = await pool.query(
      'INSERT INTO courses (title, description, category) VALUES ($1, $2, $3) RETURNING *',
      [title, description, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
