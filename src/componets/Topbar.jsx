import React from 'react'
import { assets } from '../assets/assets'

export const Topbar = () => {
  return (
    <div className="topbar">
        <div className="topbar-wrapper">
            <img src={assets.logo_start}/>
            <p>KIMILA <br />MICROCREDITO E.I</p>
        </div>
        
    </div>
  )
}
