import React, { useState, useEffect } from 'react'
import SingleCourse from './SingleCourse'
import { Typography } from '@mui/material'
function CourseFeed() {
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
  }, [])

  function ondeleteClick(id) {
    const response = fetch('http://localhost:3000/admin/courses/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data)
        setCourses(courses.filter((course) => course.id !== id))
      })
    })
  }
  return (
    <div>
      <div>
        <Typography style={{ paddingBottom: '12px' }} variant="h5">
          My Courses
        </Typography>
        <div>
          {courses?.map((course) => (
            <SingleCourse
              key={course.id}
              id={course.id}
              title={course.title}
              published={course.published}
              handleDelete={ondeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseFeed
