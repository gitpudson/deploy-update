import { useState } from 'react'
import React from 'react'
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AddGoogleSheet from './pages/AddGoogleSheet/AddGoogleSheet'
import ListGoogleSheet from './pages/ListGoogleSheet/ListGoogleSheet'
import Orders from './pages/Orders/Orders'

function App() {

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<AddGoogleSheet/>}/>
          <Route path='/list' element={<ListGoogleSheet/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
