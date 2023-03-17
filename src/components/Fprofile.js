import { useLocation } from "react-router-dom"
import React, { useState,useEffect } from 'react'
import {
    Button,
    Avatar,
    Link
  } from "@mui/material";

import StickyBox from "react-sticky-box";
import { onSnapshot,doc ,setDoc,deleteDoc} from 'firebase/firestore';
import { auth,db} from '../config'
import './Fprofile.css'



export const Fprofile = () => {
    const location = useLocation()
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);

    const [name, setName] = useState("");
    const [dp, setDp] = useState("");
    const [prfl, setPrfl] = useState("");
    const [followbtn,setFollowBtn]=useState(true)
    useEffect( () => {

        const unsubscribe = auth.onAuthStateChanged(async (authuser) => {
            setUid(location.state.uid);
            const promise=[];
            if (authuser) {
              setUser(authuser);
              console.log(authuser.uid);
              
               promise.push(onSnapshot(doc(db, "Users", uid), (snap) => {
                if (snap) {
                  console.log("hai "+uid)
                  setDp(snap.data().profilePic);
                  setName(snap.data().userName);
                  console.log(dp);
                }
            }));
             
            promise.push(onSnapshot(doc(db, "Users", uid,"Friends",user.uid), (snap) => {
                if (snap.data()!==undefined) {
                    console.log(snap.data())    
                 setFollowBtn(false);
                }
            }));
             await Promise.all(promise)
          
            } else {
              setUser(null);
            }
          });
          return () => unsubscribe();
      

      
      }, [user]);
    const followHandler=async()=>{
        try {
            const prom=[];
            if(followbtn){
            
            prom.push(setDoc(doc(db, "Users",user.uid,"Friends",uid), {uid:user.uid}, { merge: true }));
            prom.push(setDoc(doc(db, "Users",uid,"Friends",user.uid), {uid:uid}, { merge: true }));
            await Promise.all(prom);
            console.log("saved")
            setFollowBtn(false)
            }else{
                prom.push(deleteDoc(doc(db, "Users", user.uid,"Friends",uid)));
                prom.push(deleteDoc(doc(db, "Users", uid,"Friends",user.uid)));
                await Promise.all(prom)
                setFollowBtn(true)
            }
        } catch (error) {   
            console.log(error)
        }
    }

  return (
   
    <div>
      <span>
                <StickyBox offsetTop={150} offsetBottom={100}>
                  <div className="app__userInfo">
                    <div className="app__avatarOut">
                      <Avatar src={dp} alt="h" className="app__avatar" />
                    </div>
                    <span>
                      <h3 className="app__user">
                        <a onClick={() => setPrfl(true)}>
                          {user ? name : "dummy"}
                        </a>&nbsp;&nbsp;
                        {followbtn? <Button onClick={followHandler} className="follow">follow</Button>: <Button onClick={followHandler} className="follow">unfollow</Button> }
                      </h3>{" "}
                      <p className="app__username"></p>
                    </span>
                  </div>
                  <footer className="app__footer">
                    © 2023 carestack BY {""}
                    <Link
                      style={{ color: "#7e7e7e80" }}
                      href="https://github.com/Duyoofmp"
                      target="blank"
                    >
                      <strong>Duyoof</strong>
                    </Link>{" "}
                  </footer>
                </StickyBox>
              </span>
    </div>
  )
  
}
