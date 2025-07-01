const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const db = req.app.locals.db;
  const { username, password, email } = req.body;

  // Validación simple
  if (!username || !password || !email) {
    return res.status(400).json({ message: "Faltan campos obligatorios." });
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, NOW())";

    db.query(query, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error("❌ Error al insertar en la base:", err);
        return res.status(500).json({ error: "Error en base de datos" });
      }

      res.status(201).json({
        message: "✅ Usuario creado exitosamente",
        userId: result.insertId
      });
    });
  } catch (err) {
    console.error("❌ Error general:", err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};
