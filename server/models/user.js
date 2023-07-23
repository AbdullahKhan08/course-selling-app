const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide username'],
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
  },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
})

module.exports = mongoose.model('User', userSchema)
