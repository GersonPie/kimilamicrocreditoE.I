import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import App, { AppContext } from '../App'

export const NavBar = () => {

    const {go_to_page} = useContext(AppContext)
  return (
    <div className="navbar">
        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_home} onClick={
                ()=>{
                    go_to_page("home")
                }
            } alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_people} onClick={
                ()=>{
                    go_to_page("clients")
                }
            } alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_add} onClick={
                ()=>{
                    go_to_page("add_client")
                }
            } alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_graph} onClick={
                ()=>{
                    go_to_page("graph")
                }
            } alt="" />
        </div>

        <div className="navbar-each-icon-wrapper">
            <img src={assets.icon_settings} alt="" />
        </div>
    </div>
  )
}
