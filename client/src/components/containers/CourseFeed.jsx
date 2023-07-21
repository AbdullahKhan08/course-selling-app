import React, { useState, useEffect } from 'react'
import SingleCourse from './SingleCourse'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function CourseFeed() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/admin/courses', {
      method: 'GET',
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    }).then((response) => {
      response.json().then((data) => {
        setCourses(data.courses)
      })
    })
  }, [courses])

  function handleEditClick(_id) {
    navigate('/EditCourse', {
      state: { _id: _id },
    })
  }

  function ondeleteClick(_id) {
    const response = fetch('http://localhost:3000/admin/courses/' + _id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      response.json().then((data) => {})
      window.location = '/dashboard'
    })
  }

  return (
    <div>
      <div>
        <Typography
          style={{ padding: '20px 10px', margin: '20px 10px' }}
          variant="h5"
        >
          My Courses
        </Typography>
        <div>
          {courses?.map((course) => (
            <SingleCourse
              key={course._id}
              _id={course._id}
              title={course.title}
              published={course.published}
              handleDelete={ondeleteClick}
              handleEdit={handleEditClick}
            />
          ))}
          {courses.title}
        </div>
      </div>
    </div>
  )
}

export default CourseFeed
