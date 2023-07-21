const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

const ADMIN_SECRET = 'Dan66g3rS3cret'
const USER_SECRET = 'Da44ngS3cret'

// define mongoose schema

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

// define mongoose models

const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

// connect to mongo db

mongoose.connect(
  'mongodb+srv://abdullahkhan171202:abdullah6544@nodeexpressprojects.j27h5pu.mongodb.net/course-selling-app'
)

const adminAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'no token available!' })
  } else {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, ADMIN_SECRET, (err, admin) => {
      if (err) {
        return res.status(403).json({ msg: 'Authentication failed' })
      }
      req.admin = admin
      next()
    })
  }
}
const userAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'no token available!' })
  } else {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, USER_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: 'Authentication failed' })
      }
      req.user = user
      next()
    })
  }
}

// Admin routes
app.post('/admin/signup', async (req, res) => {
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

app.post('/admin/login', async (req, res) => {
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

app.get('/admin/me', adminAuthentication, (req, res) => {
  return res.status(200).json({ username: req.admin.username })
})

app.post('/admin/courses', adminAuthentication, async (req, res) => {
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

app.get('/admin/courses/insights', adminAuthentication, async (req, res) => {
  const published = await Course.find({ published: true })
  const notPublished = await Course.find({ published: false })
  res.status(200).json({
    published: published.length,
    notPublished: notPublished.length,
  })
})

app.put('/admin/courses/:courseId', adminAuthentication, async (req, res) => {
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

app.delete(
  '/admin/courses/:courseId',
  adminAuthentication,
  async (req, res) => {
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
  }
)

app.get('/admin/courses/:courseId', adminAuthentication, async (req, res) => {
  try {
    const course = await Course.find({ _id: req.params.courseId })

    if (course) {
      return res.status(200).json({ course })
    } else {
      return res.status(404).json({ msg: 'Course not found' })
    }
  } catch (err) {
    return res.status(500).json({ msg: 'An error occurred' })
  }
})

app.get('/admin/courses', adminAuthentication, async (req, res) => {
  const courses = await Course.find({})
  res.status(200).json({ courses })
})

// User routes
app.post('/users/signup', async (req, res) => {
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

app.post('/users/login', async (req, res) => {
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

app.get('/users/courses', userAuthentication, async (req, res) => {
  // logic to list all courses
  const user = await User.findOne({ username: req.user.username })
  if (user) {
    const courses = await Course.find({ published: true })
    return res.status(200).json({ courses })
  } else {
    return res.status(403).json({ msg: 'Forbidden' })
  }
})

app.post('/users/courses/:courseId', userAuthentication, async (req, res) => {
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

app.get('/users/purchasedCourses', userAuthentication, async (req, res) => {
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

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
