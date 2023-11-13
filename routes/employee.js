const emply = require('express').Router();
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

emply.get('/', (req, res) => {
    const sql = `SELECT id, first_name, last_name FROM employees`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.send(rows);
    });
});


emply.get('/listbymanager/:id', (req, res) => {
    const sql = `SELECT id, first_name, last_name FROM employees Where manager_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }      
      res.send(rows);
    });
});

emply.get('/listbydepartment/:id', (req, res) => {
    const sql = `SELECT employees.id, first_name, last_name FROM employees inner join roles on roles.id = employees.role_id Where roles.department_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }      
        res.send(rows);
      });
  });

emply.post('/', (req, res) => {
    const sql = `INSERT INTO employees (first_Name, last_Name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [req.body.emplyfirstname, req.body.emplylastname, req.body.emplyrole, req.body.emplymgr];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.send(`Employee of ${req.body.first_name} ${req.body.last_name} has been added.`);
    }); 
});

emply.post('/updaterole/:emply_id', (req, res) => {
  const sql = `UPDATE employees set role_ID = ? where id = ?`;
  const params = [req.body.selectedrole, req.params.emply_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.send(`Employee role has been updated.`);
  }); 
});

emply.post('/updatemanager/:emply_id', (req, res) => {
  const sql = `UPDATE employees set manager_id = ? where id = ?`;
  const params = [req.body.selemplymanger, req.params.emply_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.send(`Employee manager has been updated.`);
  }); 
});


module.exports = emply;