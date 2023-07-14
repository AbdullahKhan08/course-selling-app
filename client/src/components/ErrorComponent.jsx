import { Typography } from '@mui/material'
import React from 'react'

function ErrorComponent({ message }) {
  return (
    <div>
      <Typography variant="h3" className="text-center">
        {message}
      </Typography>
    </div>
  )
}

export default ErrorComponent
