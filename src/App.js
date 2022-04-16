import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import UserForm from './Form/UserForm'
import NewForm from './Forms/NewForm';
import Home from './Home/Home';
import Nav from './Nav/Nav';
const App = () => {
  return (
    <div>
      <BrowserRouter>

        <Nav />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='login' element={<UserForm />}></Route>
            <Route path='logins' element={<NewForm />}></Route>
          </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App