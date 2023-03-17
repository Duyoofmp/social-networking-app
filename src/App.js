
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Fprofile } from './components/Fprofile'
import { LLogin } from './components/Login'
export const App = () => {

  return (
    <Router>
      <Routes>
           <Route path="/" exact element={<LLogin/>}/>
           <Route path="/fprofile" element={<Fprofile />} />
          </Routes>
    </Router>
  )
}
