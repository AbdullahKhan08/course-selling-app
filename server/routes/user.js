const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Course = require('../models/course')
const { userAuthentication, USER_SECRET } = require('../middleware/auth')

const router = express.Router()

router.post('/signup', async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  let existingUser = await User.findOne({ username })

  if (existingUser) {
    res.status(403).json({ msg: 'User already exists' })
  } else {
    const newUser = new User({ username, password })
    await newUser.save()
    const token = jwt.sign({ username, role: 'user' }, USER_SECRET, {
      expiresIn: '1h',
    })
    return res
      .status(201)
      .json({ msg: 'User created successfully', token: token })
  }
})

router.post('/login', async (req, res) => {
  // logic to log in user

  const { username, password } = req.headers

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  const existingUser = await User.findOne({ username, password })

  if (existingUser) {
    const token = jwt.sign({ username, role: 'user' }, USER_SECRET, {
      expiresIn: '1h',
    })
    return res.status(200).json({ msg: 'Logged in successfully', token: token })
  } else {
    return res.status(403).json({ msg: 'Invalid username or password' })
  }
})

router.get('/courses', userAuthentication, async (req, res) => {
  // logic to list all courses
  const user = await User.findOne({ username: req.user.username })
  if (user) {
    const courses = await Course.find({ published: true })
    return res.status(200).json({ courses })
  } else {
    return res.status(403).json({ msg: 'Forbidden' })
  }
})

router.post('/courses/:courseId', userAuthentication, async (req, res) => {
  const course = await Course.findById(req.params.courseId)
  if (course) {
    const user = await User.findOne({ username: req.user.username })
    if (user) {
      const purchasedCourses = user.purchasedCourses
      if (purchasedCourses.includes(course._id)) {
        return res.status(403).json({
          msg: 'You have already purchased this course',
        })
      } else {
        user.purchasedCourses.push(course)
        await user.save()
        return res.status(201).json({ msg: 'Course purchased successfully' })
      }
    } else {
      return res.status(403).json({ msg: 'User not found' })
    }
  } else {
    return res
      .status(404)
      .json({ msg: 'Course not found or course not available' })
  }
})

router.get('/purchasedCourses', userAuthentication, async (req, res) => {
  // logic to view purchased courses

  const user = await User.findOne({ username: req.user.username }).populate(
    'purchasedCourses'
  )
  if (user) {
    res.status(200).json({ purchasedCourses: user.purchasedCourses || [] })
  } else {
    res.status(403).json({ msg: 'User not found' })
  }
})

module.exports = router
