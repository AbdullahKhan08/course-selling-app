import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Appbar from './components/Appbar'
import AdminDashboard from './components/AdminDashboard'
import AddCourse from './components/AddCourse'
import Courses from './components/Courses'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Appbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
