import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import Signin from './Signin'
import Forget from './Forget'
import { Mainpath } from './components/Coms/Mainpath'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetPass" element={<Forget />} />
        <Route path="/Homepage" element={<Mainpath />} />
        <Route path="/Homepage/:userId" element={<Mainpath />} />
        <Route path="/Homepage/Allemployee/:employeeId" element={<Mainpath />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
