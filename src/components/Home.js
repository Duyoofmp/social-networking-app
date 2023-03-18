import React, { useState, useEffect } from "react";
import { auth, db } from "../config";
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [friendscount, setFriendsCount] = useState(0);

  const [dp, setDp] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const prom = [];
    const unsubscribe = auth.onAuthStateChanged(async (authuser) => {
      if (authuser) {
        setUser(authuser);
        console.log(authuser.uid);

        prom.push(
          onSnapshot(doc(db, "Users", authuser.uid), (snap) => {
            if (snap) {
              console.log("hj");
              setDp(snap.data().profilePic);
              setUsername(snap.data().userName);
              setName(snap.data().name);
              setBio(snap.data().Bio)
              console.log(dp);
            }
          })
        );
        const docsOfUser = await getDocs(
          collection(doc(db, "Users", authuser.uid), "Friends")
        );
        setFriendsCount(docsOfUser.docs.length);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    const q = query(
      collection(db, "Users"),
      where("Keywords", "array-contains", searchQuery)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ ...doc.data(), uid: doc.id });
      });
      setSearchResults(results);
    });
  };
  const prof = (uid) => {
    console.log(uid);
    navigate("/fprofile", { state: { uid: uid } });
  };
  const friendsList = async () => {
    navigate("/friends");
  };
  const editnav=()=>{
navigate('/editProfile')
  }

  return (
    <div>
     <nav>
  <div className="logo">
    <h1>CareStack Social App</h1>
  </div>
  <div className="search">
    <input onChange={handleSearch} type="text" placeholder="Search users..."/>
    <div className="dropdown">
                  <div className="dropdown-row">
                    {searchResults.map((result) => (
                      <div
                        className="inndiv"
                        onClick={() => {
                          prof(result.uid);
                        }}
                        key={result.uid}
                      >
                        <img className="simg" src={result.profilePic}></img>
                        <span>{result.userName}</span>
                      </div>
                    ))}
                  </div>
                </div>
  </div>
  <div className="logout">
    <button   onClick={() => auth.signOut()} >Logout</button>
  </div>
</nav>


      <section className="profile">
        <div className="profile-picture">
          <img src={dp} alt="Profile Picture" />
        </div>
        <div className="profile-info">
          <h1>{name}</h1>
          <p className="username">{username}</p>
          <p className="bio">
           {bio}
          </p>
          <a  onClick={editnav} className="edit-profile">
            Edit Profile
          </a>
          <div className="stats">
            <div className="friends" onClick={friendsList}>
              <button className="count">{friendscount} Friends</button>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
