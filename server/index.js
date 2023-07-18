const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const jwt_secret = 'Dang3rS3cret'

let ADMINS = []
let USERS = []
let COURSES = []

const generateToken = (user) => {
  const payload = { username: user.username }
  let token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' })
  return token
}

const jwtAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'no token available!' })
  } else {
    try {
      const token = authHeader.split(' ')[1]

      const decoded = jwt.verify(token, jwt_secret)

      req.user = decoded
      next()
    } catch (error) {
      res.status(401).json({ msg: 'Error occured Invalid token!' })
    }
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  let existingAdmin = ADMINS.find((admin) => {
    return admin.username === username
  })

  if (existingAdmin) {
    return res.status(403).json({ msg: 'admin already exists' })
  }

  let uniqueID = Math.floor(Math.random() * 1000000)
  let newAdmin = {
    id: uniqueID,
    username: username,
    password: password,
  }

  let token = generateToken(newAdmin)

  ADMINS.push(newAdmin)
  res.status(201).json({ msg: 'Admin created successfully', token: token })
})

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  const existingAdmin = ADMINS.find((admin) => {
    return admin.username === username && admin.password === password
  })

  if (existingAdmin) {
    const token = generateToken(existingAdmin)

    res.status(200).json({ msg: 'Logged in successfully', token: token })
  }

  return res.status(401).json({ msg: 'Admin authentication failed' })
})

app.get('/admin/me', jwtAuthentication, (req, res) => {
  return res.status(200).json({ username: req.user.username })
})

app.post('/admin/courses', jwtAuthentication, (req, res) => {
  // logic to create a course
  const newCourse = req.body
  newCourse.id = Date.now()
  COURSES.push(newCourse)
  return res.status(201).json({
    msg: 'Course created successfully',
    courseId: newCourse.id,
  })
})

app.get('/admin/courses/insights', jwtAuthentication, (req, res) => {
  let published = 0
  let notPublished = 0

  COURSES.forEach((course) => {
    if (course.published === true) {
      published++
    } else {
      notPublished++
    }
  })

  return res.status(200).json({
    published: published,
    notPublished: notPublished,
  })
})

app.put('/admin/courses/:courseId', jwtAuthentication, (req, res) => {
  // logic to edit a course
  const { courseId } = req.params
  let courseIndex = COURSES.findIndex((course) => {
    return course.id === Number(courseId)
  })

  if (courseIndex > -1) {
    const updatedCourse = { ...COURSES[courseIndex], ...req.body }
    COURSES[courseIndex] = updatedCourse
    return res.status(200).json({ msg: 'Course updated succesfully' })
  } else {
    return res.status(404).json({ msg: 'Course not found' })
  }
})
app.delete('/admin/courses/:courseId', jwtAuthentication, (req, res) => {
  const { courseId } = req.params
  let courseIndex = COURSES.findIndex((course) => {
    return course.id === Number(courseId)
  })

  if (courseIndex > -1) {
    COURSES.splice(courseIndex, 1)
    return res.status(200).json({ msg: 'Course deleted succesfully' })
  } else {
    return res.status(404).json({ msg: 'Course not found' })
  }
})

app.get('/admin/courses/:courseId', jwtAuthentication, (req, res) => {
  // logic to get single courses
  const { courseId } = req.params
  let courseIndex = COURSES.findIndex((course) => {
    return course.id === Number(courseId)
  })

  if (courseIndex > -1) {
    return res.status(200).json({ course: COURSES[courseIndex] })
  }

  return res.status(404).json({ msg: 'Course not found' })
})

app.get('/admin/courses', jwtAuthentication, (req, res) => {
  // logic to get all courses
  res.status(200).json({ courses: COURSES })
})

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  let existingUser = USERS.find((user) => {
    return user.username === username
  })

  if (existingUser) {
    res.status(401).json({ msg: 'User already exists' })
  } else {
    let uniqueId = Math.floor(Math.random() * 10000000)
    let newUser = {
      id: uniqueId,
      username: username,
      password: password,
    }

    let token = generateToken(newUser)

    USERS.push(newUser)
    return res
      .status(201)
      .json({ msg: 'User created successfully', token: token })
  }
})

app.post('/users/login', (req, res) => {
  // logic to log in user

  const { username, password } = req.headers

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please provide username and password' })
  }

  const existingUser = USERS.find((user) => {
    return user.username === username && user.password === password
  })

  if (existingUser) {
    const token = generateToken(existingUser)
    res.status(200).json({ msg: 'Logged in successfully', token: token })
  }

  return res.status(401).json({ msg: 'User authentication failed' })
})

app.get('/users/courses', jwtAuthentication, (req, res) => {
  // logic to list all courses
  let filteredCourses = COURSES.filter((course) => {
    return course.published === true
  })

  return res.status(200).json({ courses: filteredCourses })
})

app.post('/users/courses/:courseId', jwtAuthentication, (req, res) => {
  // logic to purchase a course
  const courseId = Number(req.params.courseId)
  let courseAvailable = COURSES.find((course) => {
    return course.id === courseId && course.published === true
  })

  if (courseAvailable) {
    const user = USERS.find((user) => {
      return user.username === req.user.username
    })

    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = []
      }
      user.purchasedCourses.push(courseAvailable)
      return res.status(201).json({ msg: 'Course purchased successfully' })
    } else {
      res.status(403).json({ msg: 'User not found' })
    }
  } else {
    return res
      .status(404)
      .json({ msg: 'Course not found or course not available' })
  }
})

app.get('/users/purchasedCourses', jwtAuthentication, (req, res) => {
  // logic to view purchased courses

  const user = USERS.find((user) => {
    return user.username === req.user.username
  })

  if (user && user.purchasedCourses) {
    res.status(200).json({ purchasedCourses: user.purchasedCourses })
  } else {
    res.status(404).json({ msg: 'No courses purchased' })
  }
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
