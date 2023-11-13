const rol = require('express').Router();
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'company_db'
    }
  );

rol.get('/', (req, res) => {
    const sql = `SELECT id, title, salary FROM roles`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }      
      res.send(rows);
    });
});

rol.post('/', (req, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ? , ?)`;
    const params = [req.body.rolname, req.body.rolsalary, req.body.roldepartment];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.send(`Role of ${req.body.rolname} has been added.`);
    });
});



module.exports = rol;