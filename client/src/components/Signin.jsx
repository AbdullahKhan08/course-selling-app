import React from 'react'
import '../Styles/Signup.css'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { InputAdornment } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    const response = fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
        username: email,
        password: password,
      },
    }).then((resp) => {
      resp.json().then((data) => {
        if (resp.status === 200) {
          localStorage.setItem('token', data.token)
          window.location = '/dashboard'
        }
        if (resp.status === 401 || resp.status === 400) {
          alert(data.msg)
        }
      })
    })
  }

  return (
    <div>
      <div className=" flex mt">
        <Typography variant="h5">Welcome Back. Sign in below</Typography>
      </div>
      <div className="flex">
        <Card className="parentDiv mr">
          <div className="textInput">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlinedIcon className="icons" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
              className="mb"
              value={email}
              fullWidth={true}
              color="success"
              label="Username"
              variant="outlined"
            />
          </div>

          <div className="textInput">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon className="icons" />
                  </InputAdornment>
                ),
              }}
              color="success"
              onChange={(e) => setPassword(e.target.value)}
              className="mb"
              value={password}
              fullWidth={true}
              label="Password"
              type="password"
              variant="outlined"
            />
          </div>

          <div className="signUpBtn">
            <Button
              onClick={handleSubmit}
              className="btn-design"
              size={'large'}
              color="success"
              variant="contained"
            >
              Signin
              <LoginRoundedIcon className="icons" />
            </Button>
          </div>
          <div className="line"></div>
          <div className="alreadyAdmin">
            <Typography className="text-design" variant="h6">
              Don't have an account?
            </Typography>
            <Button
              onClick={() => navigate('/signup')}
              className="btn-design"
              variant="outlined"
              color="success"
              size="large"
            >
              SignUp
              <LoginRoundedIcon className="icons" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Signin
