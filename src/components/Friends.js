import {React,useState,useEffect} from 'react'
import {auth,db} from '../config'
import { collection,getDocs,doc, getDoc } from "firebase/firestore";

export const Friends = () => {
  const [user, setUser] = useState(null);
  const [usersdata, setUsersData] = useState([]);



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
    
  return (
    <div>
        
            {usersdata.map(ele=>(
            
                <ul>
                <li>{ele.name}</li>
                <li>{ele.userName}</li>
                <li>{ele.profilePic}</li>
                <li>{ele.email}</li>
                </ul>
                
            ))}
            
    </div>
  )
}
