import { useLocation } from "react-router-dom"
import React, { useState,useEffect } from 'react'

import { onSnapshot,doc ,setDoc,deleteDoc, getDocs, collection} from 'firebase/firestore';
import { auth,db} from '../config'
import './Fprofile.css'
import { useNavigate } from 'react-router-dom';



export const Fprofile = () => {
    const location = useLocation()
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const [name,setName]=useState("")
    const [dp, setDp] = useState("");
    const [friendscount, setFriendsCount] = useState(0);


    
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
                  setUsername(snap.data().userName);
                  setName(snap.data().name)
                  setBio(snap.data().Bio)

                  console.log(dp);
                }
            }));
            const docsOfUser = await getDocs(
              collection(doc(db, "Users", uid), "Friends")
            );
            setFriendsCount(docsOfUser.docs.length);

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
    const navigate = useNavigate();
    
    const seeMutuals=()=>{
        navigate("/mutuals",{state:{uid:uid}})
    }
  

  return (
   
    <div>
        <nav>
  <div className="logo">
    <span>
		<button  onClick={()=>navigate('/')} className="navbar__back-button">&lt; Back</button>

    <h1>CareStack Social App</h1>
    </span>
  </div>
 
</nav>
      <section className="profile">
        <div className="profile-picture">
          <img src={dp} alt="Dp" />
        </div>
        <div className="profile-info">
          <h1>{name}</h1>
          <p className="username">{username}</p>
          <p className="bio">
           {bio}
          </p>
          <span><p onClick={seeMutuals} className="app__username"><b>see mutual friends</b></p> </span>
          {followbtn?<a  onClick={followHandler} className="edit-profile">
            follow
          </a>:<a  onClick={followHandler} className="edit-profile">
            unfollow
          </a>}
          <div className="stats">
            <div className="friends">
              <button className="count">{friendscount} Friends</button>
              
            </div>
          </div>
        </div>
      </section>
     
    </div>
  )
  
}
