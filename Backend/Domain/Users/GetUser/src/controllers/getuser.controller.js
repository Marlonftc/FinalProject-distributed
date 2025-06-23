const getUserModel = require('../models/user.model');

exports.getUser = (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;

  getUserModel(db, id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  });
};
