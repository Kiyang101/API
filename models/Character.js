const mongoose = require("mongoose");
const CharacterSchema = new mongoose.Schema({
  id: Number,
  name: String,
  weapon: String,
  elements: String,
  rarity: Number,
  select: Boolean,
  display: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Character", CharacterSchema);
