const mysql = require('mysql2');
const waitPort = require('wait-port');

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const connectToDatabase = async () => {
  // Esperar a que el puerto esté listo
  console.log('⏳ Esperando conexión a MySQL desde db.js...');
  const open = await waitPort({ host: dbConfig.host, port: dbConfig.port, timeout: 60000 });

  if (!open) {
    console.error('❌ MySQL no está disponible desde db.js');
    process.exit(1);
  }

  // Conexión segura
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.error('❌ Error al conectar con MySQL desde db.js:', err);
      process.exit(1);
    } else {
      console.log('✅ Conectado a MySQL (deleteuser db.js)');
    }
  });

  return connection;
};

module.exports = connectToDatabase;
