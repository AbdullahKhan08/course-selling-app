import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Appbar from './Appbar'
import AddCourse from './AddCourse'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
