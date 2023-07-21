import React, { useState } from 'react'
import '../Styles/Signup.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { InputAdornment } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit() {
    fetch('http://localhost:3000/admin/signup', {
      method: 'POST',
      body: JSON.stringify({ username: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((data) => {
        try {
          if (response.status === 201) {
            alert(data.msg)
            navigate('/signin')
          }
          if (response.status === 400 || response.status === 403) {
            alert(data.msg)
          }
        } catch (error) {
          console.log(error)
        }
      })
    })

    setEmail('')
    setPassword('')
  }
  return (
    <div>
      <div className=" flex mt">
        <Typography variant="h5">Welcome to LearnHub. Sign up below</Typography>
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
              color="success"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mb"
              fullWidth={true}
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
              value={password}
              className="mb"
              fullWidth={true}
              label="Password"
              type="password"
              variant="outlined"
            />
          </div>

          <div className="signUpBtn">
            <Button
              color="success"
              onClick={handleSubmit}
              size={'large'}
              variant="contained"
            >
              SignUp
              <LoginRoundedIcon className="icons" />
            </Button>
          </div>
          <div className="line"></div>
          <div className="alreadyAdmin">
            <Typography className="text-design" variant="h6">
              Already have an account?
            </Typography>
            <Button
              onClick={() => navigate('/signin')}
              className="btn-design"
              variant="outlined"
              color="success"
              size="large"
            >
              SignIn
              <LoginRoundedIcon className="icons" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Signup
