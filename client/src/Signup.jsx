import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import './Signup.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    fetch('http://localhost:3000/admin/signup', {
      method: 'POST',
      body: JSON.stringify({ username: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data)
        localStorage.setItem('token', `Bearer ${data.token}`)
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
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mb"
            fullWidth={true}
            label="Username"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mb"
            fullWidth={true}
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button
            onClick={handleSubmit}
            className="btnCenter"
            size={'large'}
            variant="contained"
          >
            SignUp
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Signup
