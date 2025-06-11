const express = require('express');
const db = require('./db'); // MySQL connection pool
const app = express();
const cors = require('cors');
// const axios = require('axios');


app.use(cors()); // Allow all origins

// Middleware to parse JSON bodies (if you plan to handle POST requests later)
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to get all tasks
app.get('/tasks', (req, res) => {
  // Use the connection pool to query the database
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

app.post('/add-task', (req, res) => {
  const { title, description, status } = req.body; // Get data from request body

  // SQL query to insert the new task into the `tasks` table
  const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
  
  // Execute query
  db.query(sql, [title, description, status], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving task to database');
    }
    res.send('Task added successfully!');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

