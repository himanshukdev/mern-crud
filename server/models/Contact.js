const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  telephoneNumber: {
    type: String,
  },
  address: {
    type: String
  },
  SSN: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contact', ContactSchema);
