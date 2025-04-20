

const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  name: String,
  image: String,
  timing: String,
  date: String,

  claimedBy: {
    type: String, // staff email or ID
    default: null,
  },
  claimedAt: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model("QR", qrSchema);
