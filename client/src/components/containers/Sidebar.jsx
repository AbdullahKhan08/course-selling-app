import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'
function Sidebar() {
  const navigate = useNavigate()
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <div className="sidebar-item">
          <Typography variant="h5">Admin Dashboard</Typography>
        </div>

        <div className="sidebar-item">
          <Button
            className="sidebarBtn"
            color="success"
            onClick={() => navigate('/dashboard')}
          >
            <SidebarOption Icon={HomeIcon} text={'Overview'} />
          </Button>
        </div>

        <div className="sidebar-item">
          <Button
            color="success"
            className="sidebarBtn"
            size="small"
            onClick={() => navigate('/courses')}
          >
            <SidebarOption Icon={LibraryBooksIcon} text={'Courses'} />
          </Button>
        </div>

        <div className="sidebar-item">
          <Button
            color="success"
            className="sidebarBtn"
            size="small"
            onClick={() => navigate('/addcourse')}
          >
            <SidebarOption Icon={AddIcon} text={'Create course'} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
