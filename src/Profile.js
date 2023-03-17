
import { Button } from "@mui/material";
import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const navigate=useNavigate()
  const editnav=()=>{
navigate('/editProfile')
  }
  return (
    <div>
      {/* navbar */}
      {/* user info & bio */}
      <div className="profile__prfl">
        <Button onClick={editnav} className="profile__editprfl">Edit Profile</Button>
      </div>

      {/* posts wall */}
    </div>
  )
}
