import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { auth } from '../config/firebase'

export const Topbar = () => {
  const [adminName, setAdminName] = useState("")

  useEffect(()=>{
    const adminName_proto = auth.currentUser.displayName;
    setAdminName(adminName_proto.slice(0, adminName_proto.indexOf(' ')))
  },[auth.currentUser?.displayName])

  return (
    <div className="topbar">
        <div className="topbar-wrapper">
            <img src={assets.logo_start}/>
            <div>
            <h3>Kimila Microcredito, E.I</h3>
            <span>Admin: <span className='topbar-admin-name'>{adminName}</span></span>
            </div>
        </div>
        
    </div>
  )
}
