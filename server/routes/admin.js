const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Course = require('../models/course')
const { adminAuthentication, ADMIN_SECRET } = require('../middleware/auth')

const router = express.Router()

router.get('/me', adminAuthentication, async (req, res) => {
  return res.status(200).json({ username: req.admin.username })
})

router.post('/signup', async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  const existingAdmin = await Admin.findOne({ username })

  if (existingAdmin) {
    return res.status(403).json({ msg: 'admin already exists' })
  } else {
    const newAdmin = new Admin({ username, password })
    await newAdmin.save()

    const token = jwt.sign({ username, role: 'admin' }, ADMIN_SECRET, {
      expiresIn: '1h',
    })
    return res
      .status(201)
      .json({ msg: 'Admin created successfully', token: token })
  }
})

router.post('/login', async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  const existingAdmin = await Admin.findOne({ username, password })

  if (existingAdmin) {
    const token = jwt.sign({ username, role: 'admin' }, ADMIN_SECRET, {
      expiresIn: '1h',
    })

    return res.status(200).json({ msg: 'Logged in successfully', token: token })
  } else {
    return res.status(403).json({ msg: 'Invalid username or password' })
  }
})

router.post('/courses', adminAuthentication, async (req, res) => {
  // logic to create a course
  const { title, description, image, price } = req.body
  if (!title || !description || !image || !price) {
    return res
      .status(400)
      .json({ msg: 'Please provide the required course details' })
  }
  const newCourse = new Course(req.body)
  await newCourse.save()
  return res.status(201).json({
    msg: 'Course created successfully',
    courseId: newCourse.id,
  })
})

router.get('/courses/insights', adminAuthentication, async (req, res) => {
  const published = await Course.find({ published: true })
  const notPublished = await Course.find({ published: false })
  res.status(200).json({
    published: published.length,
    notPublished: notPublished.length,
  })
})

router.put('/courses/:courseId', adminAuthentication, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      {
        new: true,
      }
    )
    if (course) {
      return res.status(200).json({ msg: 'Course updated succesfully' })
    } else {
      return res.status(404).json({ msg: 'Course not found' })
    }
  } catch (err) {
    return res.status(500).json({ msg: 'An error occurred' })
  }
})

router.delete('/courses/:courseId', adminAuthentication, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.courseId)

    if (deletedCourse) {
      return res.status(200).json({ msg: 'Course deleted succesfully' })
    } else {
      return res.status(404).json({ msg: 'Course not found' })
    }
  } catch (err) {
    return res.status(500).json({ msg: 'An error occurred' })
  }
})

router.get('/courses/:courseId', adminAuthentication, async (req, res) => {
  try {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)

    if (course) {
      return res.status(200).json({ course })
    } else {
      return res.status(404).json({ msg: 'Course not found' })
    }
  } catch (err) {
    return res.status(500).json({ msg: 'An error occurred' })
  }
})

router.get('/courses', adminAuthentication, async (req, res) => {
  const courses = await Course.find({})
  res.status(200).json({ courses })
})

module.exports = router
