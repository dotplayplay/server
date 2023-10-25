const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dotplayplay'
});
 
// connection.connect((error, result) => {
//   if (error) {console.log(error)};
//   console.log('Connected to MySQL database!');
// });

module.exports = { connection }