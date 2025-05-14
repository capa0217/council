const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;

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

//Registers a members login and password into the member_logins table. This is done when a club treasurer confirms that the member has paid.
app.post('/users/register', (req, res) => {
  const { user_id, website_login, password } = req.body;

  const loginQuery = 'INSERT INTO member_logins (user_id, website_login, password) VALUES (?, ?, ?)';
  db.query(loginQuery, [user_id, website_login, password], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database Error' });
    }
    return res.status(200).json({ message: 'User Added Successfully' });
  });
});
//Adds a new member to the members table.
app.post('/users/newMember', (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  const { user_id, first_name, last_name, email} = req.body;
  var join_date = yyyy + '-' + mm + '-' + dd;

  const memberQuery = 'INSERT INTO members (user_id, first_name, last_name, email, join_date) VALUES (?, ?, ?, ?, ?)';
  db.query(memberQuery, [user_id, first_name, last_name, email, join_date], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database Error' });
    }
    return res.status(200).json({ message: 'Member Added' });
  });
});
//Checks how many members have joined in the past month. Used to determine a new members sequential number.
app.post('/users/checkMonthlyMembers', (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  const monthlyMembersQuery = "SELECT * FROM members WHERE join_date between '" + yyyy + "-" + mm + "-" + "01' and '" + yyyy + "-" + mm + "-" + dd + "'";
  db.query(monthlyMembersQuery, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database Error' });
    }
    return res.status(200).json({ monthlyMembers: result.length + 1, message: 'Query Successful' });
  });
});
//Checks if the requested userID is already in the members table.
app.post('/users/checkIDExists', (req, res) => {
  const { user_id } = req.body;

  const idExistsQuery = "SELECT * FROM members WHERE user_id = ?";
  db.query(idExistsQuery, [user_id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database Error' });
    }
    if(result.length > 0){
      return res.status(200).json({ exists: true, message: 'Query Successful. ID already Exists' });
    } else {
      return res.status(200).json({ exists: false, message: 'Query Successful. ID Unique' });
    }
  });
});

app.post('/users/login', (req, res) => {
  const { website_login, password } = req.body;

  // SQL query with placeholders for Email and Password
  const loginQuery = 'SELECT * FROM member_logins WHERE website_login = ? AND password = ?';

  db.query(loginQuery, [website_login, password], (err, result) => {
        const user = result[0];

    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database Error' });
    }
    if (result.length > 0) {
res.json({
        user_id: user.user_id,
        website_login: user.website_login,
        password: user.password,
        message: 'Login successful',
      });     } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
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
    res.json({ Club_id: user}); 
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
    res.json({ Club_name: user}); 
  });
});



app.get('/meeting/:id', (req, res) => {
   const clubId = req.params.id;
   const query ="SELECT * FROM meeting WHERE club_id = ?";

   db.query(query, [clubId], (err, results)=>{
     if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
   else if(results.length>0){
    res.json(results 
    );} 
   });
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ` + PORT);
});
