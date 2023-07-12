import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import './Signup.css'

function Signin() {
  return (
    <div>
      <div className=" flex mt">
        <Typography variant="h5">Welcome Back. Sign in below</Typography>
      </div>
      <div className="flex">
        <Card className="parentDiv mr">
          <TextField
            className="mb"
            fullWidth={true}
            label="Username"
            variant="outlined"
          />
          <TextField
            className="mb"
            fullWidth={true}
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button className="btnCenter" size={'large'} variant="contained">
            Signin
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Signin
