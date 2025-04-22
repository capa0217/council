const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456789', // Replace with your password
  database: 'sys' // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// POST route for login
app.post('/users', (req, res) => {
  const { Email, Password } = req.body;

  // SQL query with placeholders for Email and Password
  const query = 'SELECT * FROM sys.new_table WHERE Email = ? AND Password = ?';

  db.query(query, [Email, Password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.length > 0) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(3000, '0.0.0.0', () => {
  console.log(`Server running on port 3000`);
});
