const mysql = require("mysql2");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForMySQL() {
  const config = {
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    port: process.env.DB_PORT || 3306,
  };

  for (let i = 0; i < 10; i++) {
    const conn = mysql.createConnection(config);
    try {
      await conn.promise().connect();
      console.log("✅ MySQL is ready");
      conn.end();
      return;
    } catch (err) {
      console.log(`Waiting for mysql:${config.port}...`);
      await wait(3000);
    }
  }

  console.error("❌ Could not connect to MySQL after several attempts.");
  process.exit(1);
}

waitForMySQL();
