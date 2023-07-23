const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please provide title'],
  },
  description: {
    type: String,
    required: [true, 'please provide description'],
  },
  image: String,
  price: Number,
  published: Boolean,
})

module.exports = mongoose.model('Course', courseSchema)
