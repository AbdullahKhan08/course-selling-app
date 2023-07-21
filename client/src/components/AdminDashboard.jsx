import React, { useState, useEffect } from 'react'
import '../Styles/AdminDashboard.css'
import Sidebar from './containers/Sidebar'
import MiddleComponent from './containers/MiddleComponent'
import ProgressBar from './containers/ProgressBar'
import ErrorComponent from './ErrorComponent'

function AdminDashboard() {
  const [userEmail, setUserEmail] = useState('')

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

  if (userEmail) {
    return (
      <div className="dashboardContainer">
        <div>
          <Sidebar />
        </div>

        <div>
          <MiddleComponent />
        </div>

        <div>
          <ProgressBar />
        </div>
      </div>
    )
  } else {
    return <ErrorComponent message={'Please sign in to access Dashboard'} />
  }
}

export default AdminDashboard
