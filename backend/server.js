const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config()
const mysql = require('mysql2')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;
app.enable("trust proxy");

const allowedOrigins = ['https://login-signup-mysql-6foc.vercel.app', 'http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(bodyParser.json());

const db = mysql.createConnection(process.env.DATABASE_URL)

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM user WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, match) => {
      if (bcryptErr) {
        console.error('Bcrypt error:', bcryptErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (match) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
});

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const checkQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
  const existingUser = await new Promise((resolve, reject) => {
    db.query(checkQuery, [username, email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });

  if (existingUser) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  const hash = await bcrypt.hash(password, 10);

  const insertQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
  db.query(insertQuery, [username, email, hash], (err) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'Signup successful' });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


