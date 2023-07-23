const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const ADMIN_SECRET = process.env.ADMIN_SECRET
const USER_SECRET = process.env.USER_SECRET

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

module.exports = {
  adminAuthentication,
  userAuthentication,
  ADMIN_SECRET,
  USER_SECRET,
}
