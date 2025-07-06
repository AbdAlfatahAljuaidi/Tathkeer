const mongoose = require('mongoose');
const User = require('../models/User');

const documentModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Document = mongoose.model("Document", documentModel);

module.exports = Document;
