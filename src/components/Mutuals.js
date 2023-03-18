import { useEffect, useState } from "react";
import * as React from 'react';
import { useLocation ,useNavigate} from "react-router-dom"
import { collection,getDocs,doc, getDoc } from "firebase/firestore";
import {auth,db} from '../config';


export default function Mutuals() {
 const [user, setUser] = useState(null);
 const navigate = useNavigate();

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
  const prof = (uid) => {
    console.log(uid);
    navigate("/fprofile", { state: { uid: uid } });
  };
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
                
            {arr.map(ele=>(
              
               <div class="list-wrapper" ng-app="app" ng-controller="MainCtrl as ctrl">
            <ul class="list">
              <li class="list-item" onClick={() => {
                          prof(ele.userId);
                        }}>
                <div>
                  <img src={ele.profilePic} class="list-item-image"/>
                </div>
                <div class="list-item-content">
                  <h4>{ele.name}</h4>
                  <p>{ele.userName}</p>
                </div>
              </li>
            </ul>
            </div> 
                
            ))}
{/*    
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
</List>  */}
        </div>
    
  
  );
}
