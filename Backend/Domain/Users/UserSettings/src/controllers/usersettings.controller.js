const UserSettings = require('../models/usersettings.model');

exports.getSettings = async (req, res) => {
  try {
    const result = await UserSettings.findOne({ userId: req.params.userId });
    if (!result) return res.status(404).json({ message: 'No settings found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updated = await UserSettings.findOneAndUpdate(
      { userId: req.params.userId },
      { theme: req.body.theme },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
