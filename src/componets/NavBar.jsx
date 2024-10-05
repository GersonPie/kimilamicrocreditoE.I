import React from 'react'
import { assets } from '../assets/assets'

export const NavBar = () => {
  return (
    <div className="navbar">
        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_home} alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_people} alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_add} alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_graph} alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_settings} alt="" />
        </div>
    </div>
  )
}
