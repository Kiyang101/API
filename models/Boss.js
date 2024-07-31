const mongoose = require("mongoose");

const BossSchema = new mongoose.Schema({
    id: Number,
    name: String,
    select: Boolean,
    display: Boolean,
    updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Boss", BossSchema);
