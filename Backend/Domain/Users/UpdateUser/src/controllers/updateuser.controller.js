const db = require('../config/db');

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  const query = "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
  db.query(query, [username, password, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  });
};
