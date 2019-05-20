let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xiaojie',
  database: 'movie'
});

connection.connect(function (err) {
  if(err){       
    console.log('[query] - :' + err);
    return;
  }
  console.log('[mysql connect]  succeed!');
});

module.exports = connection;
