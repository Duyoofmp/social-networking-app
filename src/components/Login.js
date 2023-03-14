import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, storage } from '../firebase'

import createKeywords from '../keyword'
import '../Login.css'
import { db } from '../firebase'
import { doc, setDoc ,getDoc } from "firebase/firestore"; 
import { ref } from '@firebase/storage'


export const Login = () => {

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loginemail,setLoginEmail]=useState("")
    const [loginpassword,setLoginPassword]=useState("")
    const [user,setUser]=useState("")
    const [UpdateUsername,setUpdateUsername]=useState("")
    const [bio,setBio]=useState("")
    const [file,setFile]=useState(null)
    const handleImageAsFile=(e)=>{
        setFile(e.target.files[0]);
    }

    
    
    const signUp= async ()=>{
      const userCredential=await  createUserWithEmailAndPassword(auth,email,password)
            const user=userCredential.user;
            user.displayName=username;
            const arr=[];
            createKeywords(username,arr)
            console.log(arr)
            await setDoc(doc(db, "Users",user.uid), {userName:username,userId:user.uid,Keywords:arr,email:user.email}, { merge: true });
            console.log(user)
            user.userName=username
            setUser(user)
    }
    const Login=async ()=>{
      const userCredential=await  signInWithEmailAndPassword(auth,loginemail,loginpassword)
            const user=userCredential.user;
            const docSnap = await getDoc(doc(db,"Users",user.uid));
            setUser(docSnap.data())
    }
    const logout=()=>{
        signOut(auth).then(() => {
         setUser(null)
        }).catch((err) => {
           console.log(err.message)
        });
    }
   
    const addProfile=async (event)=>{
      try {
        event.preventDefault();
        let f=file
       let storagepath='users/'+username;
       const storageRef=ref(storage,storagepath)
      } catch (error) {
        
      }
    }

  return (
    <div className='loginpage'>
        {user? <div>
            <h1>Hello {user.userName}</h1>
            <form onSubmit={addProfile}>
            <input type="text" placeholder='edit username' onChange={(e)=>setUpdateUsername(e.target.value)}/>
            <input type="text" placeholder='enter bio' onChange={(e)=>setBio(e.target.value)}/>
            <input type="file" accept='.png,.jpg,.jpeg' placeholder='choose file' onChange={handleImageAsFile}/>
            <button type='submit' className='btn_default btn_add' >submit</button>
            </form>
            <button onClick={logout}>Logout</button>
        </div>
        :<div>
        <div className='app_signup'>
            <h1>
                Sign Up
            </h1>
            <input type="text" placeholder='enter username' onChange={(e)=>setUsername(e.target.value)}/>
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
            <button onClick={Login}>Login</button>

        </div>
            </div>}
        
    </div>

  )
}
