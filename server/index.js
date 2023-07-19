const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

let ADMINS = []
let USERS = []
let COURSES = []

// Read data from file, or initialize to empty array if file does not exist
try {
  ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'))
  USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'))
  COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'))
} catch {
  ADMINS = []
  USERS = []
  COURSES = []
}
console.log(ADMINS)

const SECRET = 'Dang3rS3cret'

const jwtAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'no token available!' })
  } else {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: 'Authentication failed' })
      }
      req.user = user
      next()
    })
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

  // let uniqueID = Math.floor(Math.random() * 1000000) // NO NEED FOR ID
  const newAdmin = {
    username: username,
    password: password,
  }

  ADMINS.push(newAdmin)
  fs.writeFileSync('./admins.json', JSON.stringify(ADMINS))
  const token = jwt.sign({ username, role: 'admin' }, SECRET, {
    expiresIn: '1h',
  })
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
    const token = jwt.sign({ username, role: 'admin' }, SECRET, {
      expiresIn: '1h',
    })

    return res.status(200).json({ msg: 'Logged in successfully', token: token })
  }

  return res.status(403).json({ msg: 'Invalid username or password' })
})

app.get('/admin/me', jwtAuthentication, (req, res) => {
  return res.status(200).json({ username: req.user.username })
})

app.post('/admin/courses', jwtAuthentication, (req, res) => {
  // logic to create a course
  const newCourse = req.body
  newCourse.id = COURSES.length + 1
  COURSES.push(newCourse)
  fs.writeFileSync('./courses.json', JSON.stringify(COURSES))
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
  res.status(200).json({
    published: published,
    notPublished: notPublished,
  })
})

app.put('/admin/courses/:courseId', jwtAuthentication, (req, res) => {
  // logic to edit a course
  const { courseId } = req.params
  let course = COURSES.find((course) => {
    return course.id === Number(courseId)
  })

  if (course) {
    Object.assign(course, req.body)
    fs.writeFileSync('./courses.json', JSON.stringify(COURSES))
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
    fs.writeFileSync('./courses.json', JSON.stringify(COURSES))
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
    res.status(403).json({ msg: 'User already exists' })
  } else {
    let newUser = {
      username: username,
      password: password,
    }
    USERS.push(newUser)
    fs.writeFileSync('users.json', JSON.stringify(USERS))
    const token = jwt.sign({ username, role: 'user' }, SECRET, {
      expiresIn: '1h',
    })
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
    const token = jwt.sign({ username, role: 'user' }, SECRET, {
      expiresIn: '1h',
    })
    return res.status(200).json({ msg: 'Logged in successfully', token: token })
  }

  return res.status(403).json({ msg: 'Invalid username or password' })
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
      fs.writeFileSync('./users.json', JSON.stringify(USERS))
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

  if (user) {
    res.status(200).json({ purchasedCourses: user.purchasedCourses || [] })
  } else {
    res.status(403).json({ msg: 'User not found' })
  }
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
