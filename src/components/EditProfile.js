import {React,useEffect,useState} from 'react'
import './EditProfile.css'
import { onSnapshot,doc,updateDoc } from 'firebase/firestore';
import {  ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

import { auth,db,storage} from '../config'
import { useNavigate } from 'react-router-dom';
import createKeywords from '../keyword'


export const EditProfile = () => {
  const[user,setUser]=useState(null);
  const[dp,setDp]=useState("");
  const[username,setUsername]=useState("");
  const[image,setImage]=useState(null);

  const[name,setName]=useState("");
  const[bio,SetBio]=useState("");


const navigate=useNavigate()
  
  useEffect( () => {

    const unsubscribe = auth.onAuthStateChanged(async (authuser) => {
        const promise=[];
        if (authuser) {
          setUser(authuser);
          console.log(authuser.uid);
          
           promise.push(onSnapshot(doc(db, "Users", authuser.uid), (snap) => {
            if (snap) {
              setDp(snap.data().profilePic);
              setUsername(snap.data().userName);
              setName(snap.data().name)
              SetBio(snap.data().Bio)
              console.log(dp);
            }
        }));
         await Promise.all(promise)
      
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
  

  
  }, [user]);
const UpdateProfile=()=>{
  const storageRef = ref(storage, "users/"+user.uid+"/profilePic");
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    
    switch (error.code) {
      case 'storage/unauthorized':
       
        break;
      case 'storage/canceled':
      
        break;

      // ...

      case 'storage/unknown':
       
        break;
    }
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setDp(downloadURL)
    });
  }
);
}
const saveUpdates=async ()=>{
  console.log("ahvhjub")
  const arr=[];
  createKeywords(username,arr)
  createKeywords(name,arr)
  await updateDoc(doc(db,"Users",user.uid), {
    profilePic:dp,name:name,userName:username,userId:user.uid,Keywords:arr,Bio:bio});
    navigate('/')
}

  
  return (
    <>
    <div className="navbar">
		<button  onClick={()=>navigate('/')} className="navbar__back-button">&lt; Back</button>
		<div className="navbar__edit-profile">Edit Profile</div>
	</div>
    <div className="container">
    <div className="profile-picture">
          <img src={dp} alt="Profile Picture" />
        </div>
		<form>
			<div className="form-group">
				<label htmlFor="profile-pic">Profile Picture</label>
				<input type="file"  onChange={(e) =>{if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }}} id="profile-pic" name="profile-pic"/>
			<input style={{backgroundColor:"#1abc9c",color:"whitesmoke",borderRadius:"15px",borderColor:"whitesmoke" ,marginLeft:"540px"}} onClick={UpdateProfile} type="button" value="Upload"/>

			</div>
      <div className="form-group">
				<label htmlFor="username">Username</label>
				<input type="text" id="username" onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
			</div>
      <div className="form-group">
				<label htmlFor="name">Name</label>
				<input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name}/>
			</div>
			<div className="form-group">
				<label htmlFor="bio">Bio</label>
				<textarea id="bio" name="bio" onChange={(e) => SetBio(e.target.value)}  value={bio}></textarea>
			</div>
			<input onClick={saveUpdates} type="button" value="Save Changes"/>
		</form>
	</div>
  </>
  )
}
