
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { EditProfile } from './components/EditProfile'
import { Fprofile } from './components/Fprofile'
import { Friends } from './components/Friends'
import { LLogin } from './components/Login'
import Mutuals from './components/Mutuals'
export const App = () => {

  return (
    <Router>
      <Routes>
           <Route path="/" exact element={<LLogin/>}/>
           <Route path="/fprofile" element={<Fprofile />} />
           <Route path="/mutuals" element={<Mutuals />} />
           <Route path="/friends" element={<Friends />} />
           <Route path="/editProfile" element={<EditProfile />} />

          </Routes>
    </Router>
  )
}
