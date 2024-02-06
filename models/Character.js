const mongoose = require("mongoose");
const CharacterSchema = new mongoose.Schema({
  id: Number,
  name: String,
  weapon: String,
  elements: String,
  rarity: Number,
  select: Boolean,
  display: {
    real: Boolean,
    disSearch: Boolean,
    disFour: { type: Boolean, required: false },
    disFive: { type: Boolean, required: false },
    disAnemo: { type: Boolean, required: false },
    disCryo: { type: Boolean, required: false },
    disDendro: { type: Boolean, required: false },
    disElectro: { type: Boolean, required: false },
    disGeo: { type: Boolean, required: false },
    disHydro: { type: Boolean, required: false },
    disPyro: { type: Boolean, required: false },
    disSword: { type: Boolean, required: false },
    disClaymore: { type: Boolean, required: false },
    disBow: { type: Boolean, required: false },
    disPolearm: { type: Boolean, required: false },
    disCatalyst: { type: Boolean, required: false },
  },

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Character", CharacterSchema);