import React, { useEffect, useState } from 'react'
import Course from './Course'
import '../Styles/courses.css'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Sidebar from './containers/Sidebar'
import ErrorComponent from './ErrorComponent'
function Courses() {
  const [courses, setCourses] = useState([])
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  const fetchCourses = () => {
    fetch('http://localhost:3000/admin/courses', {
      method: 'GET',

      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    }).then((response) => {
      response.json().then((data) => {
        setCourses(data.courses)
      })
    })
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        setToken(true)
      }
    }
    checkToken()
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
    <>
      <div>
        {!token ? (
          <ErrorComponent message={'Please sign in to access courses'} />
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div className="sidebar-container">
                <Sidebar />
              </div>
              <div className="coursesMain">
                {courses?.map((course) => (
                  <Course
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    image={course.image}
                    price={course.price}
                    published={course.published}
                    handleDelete={ondeleteClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Courses
