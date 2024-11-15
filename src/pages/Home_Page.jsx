import React, { useContext } from 'react'
import { AppContext } from '../App'
import { assets } from '../assets/assets.js'
import {RecentPosts} from '../componets/RecentPosts.jsx'
const Home_Page = () => {

    const {go_to_page} = useContext(AppContext)

  return (
    <div className="main-container homepage">
        

        <div className="home-main-image-wrapper">
          <div className="image-info">
            <img src={assets.icon_meter} alt="" />
            <div className="image-info-text">
              <p>Capital Em Circulação</p>
              <h2>6.481,90MZN</h2>
            </div>
          </div>
          <div onClick={()=>go_to_page('graph')} className="image-info-center-button">
              <p>GRÁFICO</p><img src={assets.icon_graph2} alt="" />
          </div>
          
        </div>

        <br />

        <RecentPosts/>
    </div>
  )
}

export default Home_Page