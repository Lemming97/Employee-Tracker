const mysql = require("mysql2");


// Connect to database
const employee_db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log('Connected to the employee database.')
  );


  employee_db.connect(function (err) {
    if (err) throw err;
  });
  
  module.exports = employee_db;