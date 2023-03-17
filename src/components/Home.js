import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../config";
import Profile from "../Profile";
import { Button, Avatar, Link } from "@mui/material";
import StickyBox from "react-sticky-box";
import { onSnapshot, doc, collection, query, where,getDocs,getDoc } from "firebase/firestore";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [friendscount, setFriendsCount] = useState(0);


  const [dp, setDp] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [prfl, setPrfl] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const prom=[];
    const unsubscribe = auth.onAuthStateChanged(async(authuser) => {
      if (authuser) {
        setUser(authuser);
        console.log(authuser.uid);

       prom.push(onSnapshot(
          doc(db, "Users", authuser.uid),
          (snap) => {
            if (snap) {
              console.log("hj");
              setDp(snap.data().profilePic);
              setUsername(snap.data().userName);
              setName(snap.data().name);
              console.log(dp);
            }
          } ));
          const docsOfUser = await getDocs(collection(doc(db, "Users", authuser.uid), "Friends"));
         setFriendsCount(docsOfUser.docs.length)

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
  const friendsList=async ()=>{
    navigate("/friends");
  }

  return (
    <div className="app">
      {prfl ? (
        <Profile />
      ) : (
        <div className="App">
          <div className="app__header">
            <a href="https://carestack.com/">
              <img
                className="app__headerImage"
                src="data:image/png;base64,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"
                alt=""
              />
            </a>
            
            <div className="search-container">
              <div className="search-inner">
                <input
                  type="text"
                  onChange={handleSearch}
                  className="app__headersearch"
                  placeholder="Search"
                />
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
            </div>
          </div>

          <div className="app__posts">
            {user && (
              <span>
                <StickyBox offsetTop={150} offsetBottom={100}>
                  <div className="app__userInfo">
                    <div className="app__avatarOut">
                      <Avatar src={dp} alt="h" className="app__avatar" />
                    </div>
                    <span>
                      <h3 className="app__user">
                        <a onClick={() => setPrfl(true)}>
                          {user ? username : "dummy"}
                        </a>
                      </h3>{" "}
                      <p className="app__username">{name}</p>
                    </span>
                    <span>
                    <Button
                        className="app__logout"
                        onClick={friendsList}
                      >
                        {friendscount} friends
                      </Button>
                      <Button
                        className="app__logout"
                        onClick={() => auth.signOut()}
                      >
                        Log Out
                      </Button>
                    </span>
                  </div>
                  <footer className="app__footer">
                    © 2023 carestack CLONE BY {""}
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
            )}
          </div>

          {user ? <Profile /> : null}
        </div>
      )}
    </div>
  );
}

export default Home;
