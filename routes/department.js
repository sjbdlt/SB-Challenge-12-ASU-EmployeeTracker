const dept = require('express').Router();
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

dept.get('/', (req, res) => {
    const sql = `SELECT id, name AS department FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.send(rows);
    });
});

dept.get('/budget', (req, res) => {
    const sql = `SELECT name as department, sum(salary) FROM departments inner join roles on roles.department_id = departments.id group by name`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.send(rows);
    });
});

dept.post('/', (req, res) => {

  //console.log('Im here');
  //console.log(req.body);

   const sql = `INSERT INTO departments (name) VALUES (?)`;
   const params = req.body.name;
  
   db.query(sql, params, (err, result) => {
     if (err) {
       res.status(400).json({ error: err.message });
       return;
     }
     res.send(`Department of ${req.body.name} has been added.`);
   });
});

dept.delete('/:dept_id', (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.dept_id];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
        message: 'Department not found'
        });
      } else {
        res.send(`Department has been deleted.`);
      }
    });
});

module.exports = dept;