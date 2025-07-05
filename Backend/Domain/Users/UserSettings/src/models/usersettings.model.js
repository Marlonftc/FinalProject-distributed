const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' }
});

module.exports = mongoose.model('UserSettings', settingsSchema);
