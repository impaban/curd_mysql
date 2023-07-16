const express = require('express');
const app = express();
const db =require('./connection');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


// Create
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('Error creating user:', err.message);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      res.json({ id: result.insertId, name, email });
    }
  });
});

// Read
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(results);
    }
  });
});

// Update
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err.message);
      res.status(500).json({ error: 'Failed to update user' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ id, name, email });
    }
  });
});

// Delete
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err.message);
      res.status(500).json({ error: 'Failed to delete user' });
    
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

app.listen(3000);
console.log("server  started ")

