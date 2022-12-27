const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'books_ecommerce',
});

dbConnection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('Connected to DB!');
  }
});

module.exports = dbConnection;
