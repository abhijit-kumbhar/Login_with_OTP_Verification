import React from 'react'
import Formdata from './Pages/Formdata'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Editstudent from './Pages/Editstudent'

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
      
      <Routes>
        
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Formdata/>}/>
        <Route path='/editstud/:id' element={<Editstudent/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
