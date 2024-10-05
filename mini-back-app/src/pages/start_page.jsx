import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import usePage from '../hooks/usePage'
export const StartPage = () => {

  return (
    <div className="startPage">
        <div className="startPage-image-wrapper">
            <img src={assets.logo_start} alt="" />
            <div className="loading-effect"></div>
        </div>
    </div>
  )
}
