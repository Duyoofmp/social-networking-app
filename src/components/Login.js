
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState,useEffect } from 'react'
import { auth } from '../config'
import { Link } from '@mui/material'
import createKeywords from '../keyword'
import './Login.css'
import Home from './Home'
import { db } from '../config'
import { doc, setDoc  } from "firebase/firestore"; 
export const LLogin = () => {
    
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [name, setName] = useState("");
    const [password,setPassword]=useState("")
    const [user,setUser]=useState(null)
    const [LS, setLS] = useState(true);
  

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authuser) => {
        if (authuser) {
          console.log(authuser);
          setUser(authuser);
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }, [user, username]);
    
    const signUp= async (event)=>{
      event.preventDefault()
      const userCredential=await  createUserWithEmailAndPassword(auth,email,password)
            const user=userCredential.user;
            user.displayName=username;
            const arr=[];
            createKeywords(username,arr)
            createKeywords(name,arr)
            console.log(arr)
            await setDoc(doc(db, "Users",user.uid), {Bio:"Upload your profile pic and add bio",profilePic:"https://tinyurl.com/3fmny3t8",name:name,userName:username,userId:user.uid,Keywords:arr,email:user.email}, { merge: true });
            console.log(user)
            user.userName=username
            setUser(user)
            
    }
    const signIn=async (event)=>{
            event.preventDefault();
            signInWithEmailAndPassword(auth,email, password).then(snap=>{
             setUser(snap.user)
            })
              .catch((error) => alert(error.message));
    }
  return (
    <div>
      {user ? (
        <Home />
      ) : (
        <div className="login">
          {LS ? (
            <div className="login__upform">
              <form className="login__signup">
                <center>
                  <img
                    className="login__headerImage"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <p className="login__desc">
                    social networking app.
                  </p>
                </center>

               
                <input
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  className="login__input"
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Username"
                  className="login__input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  placeholder="Email"
                  className="login__input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  placeholder="Password"
                  className="login__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login__btns" type="submit" onClick={signUp}>
                  Sign up
                </button>
                <p className="login__policy">
                  By signing up, you agree to our <strong>Terms</strong> ,{" "}
                  <strong>Data Policy</strong> and{" "}
                  <strong>Cookies Policy</strong> .
                </p>
              </form>
            </div>
          ) : (
            <div className="login__upform">
              <form className="login__signin">
                <center>
                  <img
                    className="login__headerImage"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <p className="login__desc">
                    social networking app.
                  </p>
                </center>

                <input
                  placeholder="Email"
                  className="login__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  placeholder="Password"
                  type="password"
                  className="login__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login__btns" type="submit" onClick={signIn}>
                  Sign In
                </button>
              </form>
            </div>
          )}

          <div className="login__switch">
            {LS ? (
              <p>
                Have an account?{" "}
                <Link style={{ color: "#0BA2FA" }} onClick={() => setLS(false)}>
                  Log in
                </Link>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <Link style={{ color: "#0BA2FA" }} onClick={() => setLS(true)}>
                  Sign up
                </Link>
              </p>
            )}
          </div>

          <center>
            <footer className="login__footer">
              © 2023  BY{" "}
              <Link
                style={{ color: "#7e7e7e80" }}
                href="https://github.com/Duyoofmp"
                target="blank"
              >
                <strong>Duyoofmp</strong>
              </Link>{" "}
            </footer>
          </center>
        </div>
      )}
    </div> 
  )
}
