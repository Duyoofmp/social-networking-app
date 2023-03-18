import {React,useState,useEffect} from 'react'
import {auth,db} from '../config'
import { collection,getDocs,doc, getDoc } from "firebase/firestore";
import './Friends.css'
import { useNavigate } from "react-router-dom";


export const Friends = () => {
  const [user, setUser] = useState(null);
  const [usersdata, setUsersData] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const prom=[];
    const unsubscribe = auth.onAuthStateChanged(async(authuser) => {
      if (authuser) {
        setUser(authuser);
        console.log(authuser.uid);
        const userData=[];
        const docsOfUser = await getDocs(collection(doc(db, "Users", authuser.uid), "Friends"));

        if(docsOfUser.docs.length!==0){
        docsOfUser.forEach(ele=>{
          prom.push(getDoc(doc(db,"Users",ele.id)))
        })
        const uData= await Promise.all(prom)
           uData.forEach(ele=>{
                userData.push(ele.data())
           })
           setUsersData(userData)
           console.log(userData)
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user]);
  const prof = (uid) => {
    console.log(uid);
    navigate("/fprofile", { state: { uid: uid } });
  };

  return (
    <div className='body'>
       <nav>
  <div className="logo">
    <span>
		<button  onClick={()=>navigate(-1)} className="navbar__back-button">&lt; Back</button>

    <h1>CareStack Social App</h1>
    </span>
  </div>
 
</nav>
                
            {usersdata.length!==0?
            usersdata.map(ele=>(
              
               <div class="list-wrapper" ng-app="app" ng-controller="MainCtrl as ctrl">
            <ul class="list">
              <li class="list-item" onClick={() => {
                          prof(ele.userId);
                        }}>
                <div>
                  <img alt="dp" src={ele.profilePic} class="list-item-image"/>
                </div>
                <div class="list-item-content">
                  <h4>{ele.name}</h4>
                  <p>{ele.userName}</p>
                </div>
              </li>
            </ul>
            </div> 
                
            )):<center><h1>no friends ...add new friends</h1></center>}
        
    </div>
  )
}
