import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState,useEffect } from 'react'
import { auth } from '../config'
import { Link } from '@mui/material'
import createKeywords from '../keyword'
import './Login.css'
import App from '../App'
import { db } from '../config'
import { doc, setDoc ,getDoc } from "firebase/firestore"; 

export const Login = () => {

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
            console.log(arr)
            await setDoc(doc(db, "Users",user.uid), {profilePic:"https://tinyurl.com/3fmny3t8",name:name,userName:username,userId:user.uid,Keywords:arr,email:user.email}, { merge: true });
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
        <App />
      ) : (
        <div className="login">
          {LS ? (
            <div className="login__upform">
              <form className="login__signup">
                <center>
                  <img
                    className="login__headerImage"
                    src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                    alt=""
                  />
                  <p className="login__desc">
                    Sign up to see your profie and your friends.
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
                    src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                    alt=""
                  />
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
              © 2020 INSTAGRAM CLONE BY{" "}
              <Link
                style={{ color: "#7e7e7e80" }}
                href="https://github.com/24cipher"
                target="blank"
              >
                <strong>CIPHER</strong>
              </Link>{" "}
            </footer>
          </center>
        </div>
      )}
    </div>  

  )
}
