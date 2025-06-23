// insertUser.js
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Configura la conexión a MySQL (fuera del contenedor = puerto 3307)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'usersdb',
  port: 3307
});

// Datos del nuevo usuario
const username = 'marlon123';
const plainPassword = '123456';
const email = 'marlon@email.com';

// Hashear la contraseña y guardar
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('❌ Error al hashear contraseña:', err);
    return;
  }

  const sql = 'REPLACE INTO users (id, username, password, email) VALUES (?, ?, ?, ?)';
  connection.query(sql, [1, username, hashedPassword, email], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar usuario:', err);
    } else {
      console.log('✅ Usuario insertado con contraseña encriptada');
    }
    connection.end();
  });
});
