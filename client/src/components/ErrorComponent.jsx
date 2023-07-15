import React from 'react'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ErrorComponent({ message }) {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        style={{ padding: '10px' }}
        variant="h3"
        className="text-center"
      >
        {message}
      </Typography>
      <Button
        style={{ marginTop: '10px' }}
        size="large"
        color="success"
        variant="contained"
        onClick={() => navigate('/signin')}
      >
        Signin
      </Button>
    </div>
  )
}

export default ErrorComponent
