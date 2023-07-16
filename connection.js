const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('DB connection failed:');
      return;
    }
    console.log('DB connected');
  }); 
   
    module.exports =db;