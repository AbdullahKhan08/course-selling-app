import React, { useEffect, useState } from 'react'
import '../Styles/Appbar.css'
import logo from '../assets/logo.png'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

function Appbar() {
  const [userEmail, setUserEmail] = useState(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserEmail(null)
    window.location = '/signin'
  }

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
      <div className="parent">
        <div className="flex">
          <img className="logo" src={logo} />
          <Typography className="text-color" variant="h4">
            LearnHub
          </Typography>
        </div>

        <div>
          <Button
            color="success"
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
        <div>
          <div className="profile">
            <div className="username">
              <Typography variant="h6">{userEmail}</Typography>
              <PermIdentityOutlinedIcon className="user-icon" />
            </div>
            <Button
              color="success"
              size={'medium'}
              className="ml"
              variant="contained"
              onClick={handleLogout}
            >
              LogOut
              <LogoutOutlinedIcon className="icon" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="parent">
      <div className="flex">
        <img className="logo" src={logo} />
        <Typography className="text-color" variant="h4">
          LearnHub
        </Typography>
      </div>

      <div>
        <div>
          <Button
            color="success"
            size={'large'}
            className="ml btn"
            variant="contained"
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
          <Button
            color="success"
            size={'large'}
            className="ml btn"
            variant="outlined"
            onClick={() => navigate('/signin')}
          >
            Signin
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Appbar
