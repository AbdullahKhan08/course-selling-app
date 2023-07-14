import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../Styles/courses.css'

function Course({
  title,
  description,
  image,
  price,
  published,
  id,
  handleDelete,
}) {
  return (
    <div className="courses_container">
      <Card className="course">
        <img className="imgDisplay" src={image}></img>
        <div className="courseInfo">
          <Typography className="course-title" variant="h5">
            {title}
          </Typography>
          <Typography className="course-description" variant="h5">
            {description}
          </Typography>
          <Typography variant="h5">{price}$</Typography>
        </div>

        <div className="btn-group">
          {!published ? (
            <h5 className="notLaunched">not Launched</h5>
          ) : (
            <h5 className="launched">Launched</h5>
          )}

          <div>
            <Button size="medium" className="editBtn" variant="contained">
              Edit
            </Button>
            <Button
              size="medium"
              onClick={() => handleDelete(id)}
              className="deleteBtn"
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Course
