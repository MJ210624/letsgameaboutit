const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  coverImage: {
    type: String
  },

  releaseDate: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Game", GameSchema);