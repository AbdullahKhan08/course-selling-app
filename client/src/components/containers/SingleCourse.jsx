import React from 'react'
import { Card, Typography, Button } from '@mui/material'
import './SingleCourse.css'

const SingleCourse = ({ title, published, id, handleDelete }) => {
  return (
    <div className="singleCourseContainer">
      <Card className="cardDesign">
        <div className="courseParent">
          <div className="text-items">
            <div className="text-item text-item-title">
              <Typography className="singleCourse-title" variant="h5">
                {title}
              </Typography>
            </div>

            <div className="text-item">
              {!published ? (
                <Typography variant="h6" className="courseNotLaunched status">
                  Not Launched
                </Typography>
              ) : (
                <Typography variant="h6" className="courseLaunched status">
                  Launched
                </Typography>
              )}
            </div>
          </div>

          <div className="course-btn-group">
            <div className="btn-item">
              <Button size="small" variant="contained" color="success">
                Edit
              </Button>
            </div>
            <div className="btn-item">
              <Button
                size="small"
                onClick={() => handleDelete(id)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SingleCourse
