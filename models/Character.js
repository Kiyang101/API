const mongoose = require("mongoose");
const CharacterSchema = new mongoose.Schema({
  id: Number,
  name: String,
  weapon: String,
  elements: String,
  rarity: Number,
  select: Boolean,
  display: Boolean,
  disAnemo: { Boolean, required: false, unique: true },
  // disCryo: { Boolean, required: false },
  // disDendro: { Boolean, required: false },
  // disElectro: { Boolean, required: false },
  // disGeo: { Boolean, required: false },
  // disHydro: { Boolean, required: false },
  // disPyro: { Boolean, required: false },
  // disSword: { Boolean, required: false },
  // disClaymore: { Boolean, required: false },
  // disBow: { Boolean, required: false },
  // disPolearm: { Boolean, required: false },
  // disCatalyst: { Boolean, required: false },

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Character", CharacterSchema);
