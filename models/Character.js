const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    name: String,
    weapon: String,
    element: String,
    rarity: Number,
    select: Boolean,
    display: Boolean,
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Character', CharacterSchema)