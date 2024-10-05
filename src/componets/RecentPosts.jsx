import React from 'react'
import { assets } from '../assets/assets'

export const RecentPosts = () => {
  return (
    <div className="recentposts">

        <h2>Recentes</h2>
        
        <div className="recent-people">
            <div className="recent-person">
                <div className="profile">
                    <img src={assets.avatar} alt="" />
                </div>
                <p>Pablo Marsal</p>
            </div>

            <div className="recent-person">
            <div className="profile">
                <img src={assets.avatar} alt="" />
            </div>
            <p>Pablo Marsal</p>
            </div>
            
            <div className="recent-person">
                <div className="profile">
                    <img src={assets.avatar} alt="" />
                </div>
                <p>Pablo Marsal</p>
            </div>
            
            <div className="recent-person">
            <div className="profile">
                <img src={assets.avatar} alt="" />
                
            </div>
                <p>Pablo Marsal</p>
            </div>
        </div>
    </div>
  )
}
