const mysql = require('mysql');

// Create a connection pool for better performance
const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: 'localhost',
  user: 'root',
  password: 'Password123!', // Replace with your actual password
  database: 'task_management' // Replace with your actual DB name
});

// Test the connection pool on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
  connection.release(); // Release the connection back to the pool
});

// Export the pool for use in other files
module.exports = pool;