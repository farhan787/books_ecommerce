const mysql = require('mysql');

const dbPool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'books_ecommerce',
});

dbPool.on('connection', () => {
  console.log('Connected to DB...');
});

module.exports = dbPool;
