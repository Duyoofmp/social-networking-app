import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'
import '../Login.css'
export const Login = () => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loginemail,setLoginEmail]=useState("")
    const [loginpassword,setLoginPassword]=useState("")
    const [user,setUser]=useState("")
    const signUp=()=>{
        createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            const user=userCredential.user;
            console.log(user)
        }).catch(err=>{
             const error=err.message
        })
    }
    const Login=()=>{
        signInWithEmailAndPassword(auth,loginemail,loginpassword).then((userCredential)=>{
            const user=userCredential.user;
            console.log(user)
            setUser(user)
        }).catch(err=>{
             const error=err.message
        })
    }
    const logout=()=>{
        signOut(auth).then(() => {
         setUser(null)
        }).catch((err) => {
           const error=err.message
        });
    }
   


  return (
    <div className='loginpage'>
        {user? <div>
            <h1>Hello{user.email}</h1>
            <button onClick={logout}>Logout</button>
        </div>:<div>
        <div className='app_signup'>
            <h1>
                Sign Up
            </h1>
            <input type="text" placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signUp}>signUp</button>

        </div>
        <div className='app_login'>
            <h1>
            Login
            </h1>
            <input type="text" placeholder='enter email' onChange={(e)=>setLoginEmail(e.target.value)}/>
            <input type="password" placeholder='enter password' onChange={(e)=>setLoginPassword(e.target.value)}/>
            <button onClick={Login}>signUp</button>

        </div>
            </div>}
        
    </div>
  )
}
