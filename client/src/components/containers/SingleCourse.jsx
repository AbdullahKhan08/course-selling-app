import React from 'react'
import { Card, Typography, Button } from '@mui/material'
import './SingleCourse.css'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const SingleCourse = ({ title, published, id, handleDelete, handleEdit }) => {
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
              <Button
                className="button-icon"
                size="small"
                onClick={() => handleEdit(id)}
                variant="contained"
                color="success"
              >
                <BorderColorOutlinedIcon className="btn-icons" />
              </Button>
            </div>
            <div className="btn-item">
              <Button
                className="button-icon"
                size="small"
                onClick={() => handleDelete(id)}
                variant="contained"
                color="error"
              >
                <DeleteOutlineOutlinedIcon className="btn-icons" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SingleCourse
