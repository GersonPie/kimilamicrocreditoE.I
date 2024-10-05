import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import usePage from '../hooks/usePage'
import { AppContext } from '../App'


export const StartPage = () => {

  const {go_to_page} = useContext(AppContext)
  
  useEffect(()=>{
      setTimeout(()=>{
        go_to_page("home")
      }, 2500)
    }
    ,[])
  
  return (
    <div className="startPage">
        <div className="startPage-image-wrapper">
            <img src={assets.logo_start} alt="" />
            <div className="loading-effect"></div>
        </div>
    </div>
  )
}
