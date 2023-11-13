const express = require('express');
const dept = require('./department');
const rol =  require('./role');
const emply =  require('./employee');

const app = express();

app.use('/department',  dept);
app.use('/role',  rol);
app.use('/employee',  emply);

module.exports = app;