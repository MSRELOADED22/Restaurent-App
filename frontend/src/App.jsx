import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Success from './Pages/Success'

// 👇 Add these imports for auth pages
import Register from './Pages/Register'
import Login from './Pages/Login'
//import Profile from './Pages/Profile'

import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/success' element={<Success />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
