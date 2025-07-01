// controllers/user.controller.js

exports.register = (req, res) => {
  const db = req.app.locals.db;
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const query = "INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, NOW())";
  db.query(query, [username, password, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  });
};

exports.login = (req, res) => {
  const db = req.app.locals.db;
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      res.status(200).json({ message: "Login exitoso" });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  });
};
