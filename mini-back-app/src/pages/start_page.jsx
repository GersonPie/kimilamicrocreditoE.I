import React from 'react'
import { assets } from '../assets/assets'
export const StartPage = () => {
  return (
    <div className="startPage">
        
        <div className="startPage-image-wrapper">
            <img src={assets.logo_start} alt="" />
            <div className="loading-effect"></div>
        </div>
        
        <div className='loading-text'>
            carregando ...
        </div>
    </div>
  )
}
