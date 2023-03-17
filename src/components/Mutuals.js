import { useEffect, useState } from "react";
import * as React from 'react';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom"
import { collection,getDocs,doc, getDoc } from "firebase/firestore";
import {auth,db} from '../config';


export default function Mutuals() {
 const [user, setUser] = useState(null);
//   const [username, setUsername] = useState("");
//   const [profilepic, setProfilepic] = useState("");
const [arr,setArr]=useState([])
  const location = useLocation()
  useEffect(() => {

    auth.onAuthStateChanged(async (authuser) => {
      if (authuser) {
  const ids=[];
  const prom=[];
const userData=[];
        
        setUser(authuser);
        console.log(authuser.uid);
        const docsOfUser = await getDocs(collection(doc(db, "Users", authuser.uid), "Friends"));
        const docsOfFrnd = await getDocs(collection(doc(db, "Users", location.state.uid), "Friends"));
        if(docsOfFrnd.docs.length!==0 && docsOfUser.docs.length!==0 ){
            console.log("keerii")
            docsOfFrnd.forEach(ele1 => {    
                console.log(ele1.id)
                docsOfUser.forEach(ele2 => ele1.id === ele2.id  && ids.push(ele1.id));
             });
        }
       ids.forEach(ele=>{
        prom.push(getDoc(doc(db,"Users",ele)))
       })
    const uData= await Promise.all(prom)
       uData.forEach(ele=>{
            userData.push(ele.data())
       })
       setArr(userData)
       console.log(userData)
       
      } else {
        setUser(null);
      }
    });
  },[]);
  return (
   <div>
   
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
  {arr.map((result,index) => (
    
  <>
      <ListItem id={index} alignItems="flex-start"> 
        <ListItemAvatar>
          <Avatar alt={result.profilePic} src={""} />
        </ListItemAvatar>
        <ListItemText
          primary={result.userName}
          secondary={
            <React.Fragment>
              {result.name}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    
    </>
  ))}
</List> 
        </div>
    
  
  );
}
