const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456789',
  database: 'sys',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.post('/users/register', (req, res) => {
  const { userId, email, password } = req.body;

  const query = 'INSERT INTO new_table (User_id, Email, Password) VALUES (?, ?, ?)';
  db.query(query, [userId, email, password], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    return res.status(200).json({ message: 'User added successfully' });
  });
});

app.post('/users/login', (req, res) => {
  const { Email, Password } = req.body;

  // SQL query with placeholders for Email and Password
  const query = 'SELECT * FROM new_table WHERE Email = ? AND Password = ?';

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
app.listen(8081, '0.0.0.0', () => {
  console.log(`Server running on port 3000`);
});
