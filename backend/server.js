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
    const user = result[0];

    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.length > 0) {
      res.json({
        user_id: user.User_id,
        Email: user.Email,
        Password: user.Password,
        message: 'Login successful',
      });   } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   
  });
});
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
const query = "SELECT Club_id FROM `member's club` WHERE User_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results;
    res.json({ Club_id: user}); // or user.email depending on your column name
  });
});

app.get('/club/:id', (req, res) => {
  const clubId = req.params.id;
const query = "SELECT Club_name FROM club WHERE Club_id = ?";

  db.query(query, [clubId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results;
    res.json({ Club_name: user}); // or user.email depending on your column name
  });
});

app.listen(8081, '0.0.0.0', () => {
  console.log(`Server running on port 3000`);
});
