const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Get user progress
router.get('/user/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM progress WHERE user_id = $1 ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark lesson as complete
router.post('/complete', async (req, res) => {
  try {
    const { user_id, lesson_id } = req.body;
    const result = await pool.query(
      'INSERT INTO progress (user_id, lesson_id, completed_at) VALUES ($1, $2, NOW()) ON CONFLICT (user_id, lesson_id) DO UPDATE SET completed_at = NOW() RETURNING *',
      [user_id, lesson_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
