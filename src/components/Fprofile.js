
import React, { useState,useEffect } from 'react'
import {
 
    Avatar,
    Link
  } from "@mui/material";

import StickyBox from "react-sticky-box";



export const Fprofile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [dp, setDp] = useState("");
    const [prfl, setPrfl] = useState(false);
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
                        </a>
                      </h3>{" "}
                      <p className="app__username">dmp</p>
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
    </div>
  )
  
}
