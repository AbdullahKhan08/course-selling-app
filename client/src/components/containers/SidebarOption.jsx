import React from 'react'
import './Sidebar.css'

function SidebarOption({ text, Icon }) {
  return (
    <div className={'sidebarOption'}>
      <Icon></Icon>
      <h3>{text}</h3>
    </div>
  )
}

export default SidebarOption
