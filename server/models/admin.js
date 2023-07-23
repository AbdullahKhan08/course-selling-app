const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide username'],
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
  },
})

module.exports = mongoose.model('Admin', adminSchema)
