import React, { useEffect, useState } from 'react'
import '../Styles/courses.css'
import Course from './Course'
import { useNavigate } from 'react-router-dom'
import Sidebar from './containers/Sidebar'
import ErrorComponent from './ErrorComponent'
function Courses() {
  const [courses, setCourses] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/admin/me', {
      method: 'GET',
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    }).then((response) => {
      response.json().then((data) => {
        setUserEmail(data.username)
      })
    })
  }, [])

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
      response.json().then((data) => {
        setCourses(courses.filter((course) => course._id !== _id))
      })
    })
  }

  if (userEmail) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="coursesMain">
            {courses?.map((course) => (
              <Course
                key={course._id}
                _id={course._id}
                title={course.title}
                description={course.description}
                image={course.image}
                price={course.price}
                published={course.published}
                handleDelete={ondeleteClick}
                handleEdit={handleEditClick}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ErrorComponent message={'Please sign in to access courses'} />
    </div>
  )
}

export default Courses
