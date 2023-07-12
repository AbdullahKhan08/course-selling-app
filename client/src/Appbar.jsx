import React from 'react'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import './Appbar.css'
import { useNavigate } from 'react-router-dom'

function Appbar() {
  const navigate = useNavigate()
  return (
    <div className="parent">
      <div>
        <Typography variant="h4">LearnHub</Typography>
      </div>

      <div>
        <Button
          size={'large'}
          className="ml"
          variant="contained"
          onClick={() => navigate('/signup')}
        >
          Signup
        </Button>
        <Button
          size={'large'}
          className="ml"
          variant="contained"
          onClick={() => navigate('/signin')}
        >
          Signin
        </Button>
      </div>
    </div>
  )
}

export default Appbar
